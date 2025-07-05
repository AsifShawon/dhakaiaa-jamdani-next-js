import { supabase } from "@/app/utils/supabase/supabaseClient";

// Fetch Products <<
export const addProduct = async (productData: FormData) => {
  const Id = crypto.randomUUID();
  const image_url = await addProductImages(productData, Id);

  const { data, error } = await supabase.from("products").insert([
    {
      title: productData.get("title") as string,
      description: productData.get("description") as string,
      detailed_desc: productData.get("detailed_desc") as string,
      category: productData.get("category") as string,
      availability: productData.get("inStock") as string,
      price: parseFloat(productData.get("price") as string),
      discount: parseInt(productData.get("discount") as string),
      image_urls: image_url,
      image_bucket_path: Id,
    },
  ]);

  if (error) {
    console.error("Error inserting product:", error);
    throw error;
  }

  return data;
};

// Add Product Images <<
export const addProductImages = async (productData: FormData, Id: string) => {
  let image_urls = [];
  const images = productData.getAll("images");
  for (const image of images) {
    const file = image as File;
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `products/${Id}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("product_images")
      .upload(filePath, file);
    if (error) {
      console.error("Error uploading image:", error);
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("product_images").getPublicUrl(filePath);

    image_urls.push(publicUrl);
  }

  return image_urls;
};

interface UpdateProductData {
  title: string;
  description: string;
  detailed_desc?: string;
  category: string;
  availability: string;
  price: number;
  discount: number;
  image_urls: string[];
  deletedImages?: string[];
  image_bucket_path?: string;
}

// Update Product <<
export const updateProduct = async (
  productData: FormData,
  productId: number
) => {
  const { data: existingProduct, error: fetchError } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  // console.log("existingProduct.data.image_bucket_path",existingProduct)

  if (fetchError) {
    throw new Error(`Error fetching product: ${fetchError.message}`);
  }

  const deletedImages = productData.get("deletedImages")
    ? JSON.parse(productData.get("deletedImages") as string)
    : [];

  let remainingImages = existingProduct.image_urls || [];

  if (deletedImages.length > 0) {
    remainingImages = existingProduct.image_urls.filter(
      (url: string) => !deletedImages.includes(url)
    );

    // Delete the files from storage
    for (const imageUrl of deletedImages) {
      const path = imageUrl.split("/").pop(); // Get filename from URL
      if (path) {
        const { error: deleteError } = await supabase.storage
          .from("product_images")
          .remove([`products/${path}`]);

        if (deleteError) {
          console.error(`Error deleting image ${path}:`, deleteError);
        }
      }
    }
  }

  const newImages = productData.getAll("images");
  let newImageUrls: string[] = [];

  console.log("existingProduct.data.image_bucket_path", existingProduct);

  if (newImages.length > 0) {
    newImageUrls = await addProductImages(
      productData,
      existingProduct.image_bucket_path
    );
  }

  const finalImageUrls = [...remainingImages, ...newImageUrls];

  const updateData: UpdateProductData = {
    title: productData.get("title") as string,
    description: productData.get("description") as string,
    detailed_desc: productData.get("detailed_desc") as string,
    category: productData.get("category") as string,
    availability: productData.get("inStock") as string,
    price: parseFloat(productData.get("price") as string),
    discount: parseInt(productData.get("discount") as string),
    image_urls: finalImageUrls,
  };

  // Update the product
  const { data, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", productId);

  if (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }

  return data;
};

// Delete Product <<
export const deleteProduct = async (productId: number) => {
  // First, get the product's image IDs
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("image_bucket_path")
    .eq("id", productId)
    .single();

  // console.log("product", product);
  if (fetchError) {
    console.error("Error fetching product:", fetchError);
    throw fetchError;
  }

  // Delete images from storage
  if (product.image_bucket_path) {
    console.log("Deleting images from storage:", product.image_bucket_path);
    const folderPath = `${product.image_bucket_path}/`;
    const { data: files, error: listError } = await supabase.storage
    .from("product_images")
    .list(folderPath);

    if (listError) {
      console.error("Error listing images:", listError);
      throw listError;
    }

    if (files && files.length > 0) {
      const filePaths = files.map(file => `${folderPath}${file.name}`);
  
      // Delete all files in the folder
      const { data, error: storageError } = await supabase.storage
        .from("product_images")
        .remove(filePaths);
  
      if (storageError) {
        console.error("Error deleting images:", storageError);
        throw storageError;
      }
  
      console.log("Files deleted successfully:", data);
    } else {
      console.log("No files found in the folder to delete.");
    }
  }

  // Delete the product record
  // const { error: deleteError } = await supabase
  //   .from("products")
  //   .delete()
  //   .eq("id", productId);

  // if (deleteError) {
  //   console.error("Error deleting product:", deleteError);
  //   throw deleteError;
  // } else {
  //   console.log("Product deleted successfully");
  //   alert("Product deleted successfully");
  // }
};
