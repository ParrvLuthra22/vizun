import { createClient } from "@/lib/supabase/server";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";

export default async function NewArrivalsPage() {
    const supabase = await createClient();

    // Fetch products along with their images and variants
    const { data: products, error } = await supabase
        .from("products")
        .select(`
            *,
            product_images (
                image_url,
                display_order
            ),
            product_variants (
                size
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching products:", error);
        return (
            <div className="min-h-screen bg-luxury-black text-white flex items-center justify-center">
                <p>Failed to load products. Please try again later.</p>
            </div>
        );
    }

    // Transform data to match ProductGrid/Card interface
    const formattedProducts = products.map((product) => {
        // Sort images by display_order
        const images = product.product_images
            ?.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
            .map((img) => img.image_url) || [];

        // Get unique sizes
        const sizes = Array.from(new Set(product.product_variants?.map(v => v.size) || []));

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            rating: product.rating,
            reviews: product.review_count,
            images: images.length > 0 ? images : ["/placeholder.jpg"], // Fallback image if none
            description: product.description || "",
            sizes: sizes,
            isNew: new Date(product.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Updated within last 7 days
            isSale: false, // You might map this from original_price > price
        };
    });

    return (
        <main className="min-h-screen bg-luxury-black">
            <Container className="pt-32 pb-20">
                <div className="mb-12">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">New Arrivals</h1>
                    <p className="text-luxury-silver max-w-2xl">
                        Discover the latest additions to our collection. Meticulously designed pieces for the modern wardrobe.
                    </p>
                </div>

                {formattedProducts.length === 0 ? (
                    <div className="text-center py-20 border border-white/5 rounded-lg">
                        <p className="text-gray-400">No products found.</p>
                    </div>
                ) : (
                    <ProductGrid products={formattedProducts} />
                )}
            </Container>
            <Footer />
        </main>
    );
}
