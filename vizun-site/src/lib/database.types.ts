export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    phone: string | null
                    avatar_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    phone?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    phone?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            addresses: {
                Row: {
                    id: string
                    user_id: string
                    label: string | null
                    full_name: string
                    phone: string
                    address_line1: string
                    address_line2: string | null
                    city: string
                    state: string
                    pincode: string
                    is_default: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    label?: string | null
                    full_name: string
                    phone: string
                    address_line1: string
                    address_line2?: string | null
                    city: string
                    state: string
                    pincode: string
                    is_default?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    label?: string | null
                    full_name?: string
                    phone?: string
                    address_line1?: string
                    address_line2?: string | null
                    city?: string
                    state?: string
                    pincode?: string
                    is_default?: boolean
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "addresses_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            products: {
                Row: {
                    id: string
                    sku: string
                    name: string
                    slug: string
                    description: string | null
                    price: number
                    original_price: number | null
                    category: string
                    fabric: string | null
                    weight: number | null
                    care_instructions: string | null
                    is_active: boolean
                    is_featured: boolean
                    stock_quantity: number
                    sold_count: number
                    view_count: number
                    rating: number
                    review_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    sku: string
                    name: string
                    slug: string
                    description?: string | null
                    price: number
                    original_price?: number | null
                    category: string
                    fabric?: string | null
                    weight?: number | null
                    care_instructions?: string | null
                    is_active?: boolean
                    is_featured?: boolean
                    stock_quantity?: number
                    sold_count?: number
                    view_count?: number
                    rating?: number
                    review_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    sku?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    price?: number
                    original_price?: number | null
                    category?: string
                    fabric?: string | null
                    weight?: number | null
                    care_instructions?: string | null
                    is_active?: boolean
                    is_featured?: boolean
                    stock_quantity?: number
                    sold_count?: number
                    view_count?: number
                    rating?: number
                    review_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            product_variants: {
                Row: {
                    id: string
                    product_id: string
                    color: string
                    color_hex: string | null
                    size: string
                    stock_quantity: number
                    sku: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    color: string
                    color_hex?: string | null
                    size: string
                    stock_quantity?: number
                    sku?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    color?: string
                    color_hex?: string | null
                    size?: string
                    stock_quantity?: number
                    sku?: string | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "product_variants_product_id_fkey"
                        columns: ["product_id"]
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    }
                ]
            }
            product_images: {
                Row: {
                    id: string
                    product_id: string
                    image_url: string
                    display_order: number
                    alt_text: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    image_url: string
                    display_order?: number
                    alt_text?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    image_url?: string
                    display_order?: number
                    alt_text?: string | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "product_images_product_id_fkey"
                        columns: ["product_id"]
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    }
                ]
            }
            cart_items: {
                Row: {
                    id: string
                    user_id: string
                    product_id: string
                    variant_id: string | null
                    quantity: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    product_id: string
                    variant_id?: string | null
                    quantity?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    product_id?: string
                    variant_id?: string | null
                    quantity?: number
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "cart_items_product_id_fkey"
                        columns: ["product_id"]
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "cart_items_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "cart_items_variant_id_fkey"
                        columns: ["variant_id"]
                        referencedRelation: "product_variants"
                        referencedColumns: ["id"]
                    }
                ]
            }
            wishlist_items: {
                Row: {
                    id: string
                    user_id: string
                    product_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    product_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    product_id?: string
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "wishlist_items_product_id_fkey"
                        columns: ["product_id"]
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "wishlist_items_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            orders: {
                Row: {
                    id: string
                    order_number: string
                    user_id: string | null
                    shipping_name: string
                    shipping_phone: string
                    shipping_address_line1: string
                    shipping_address_line2: string | null
                    shipping_city: string
                    shipping_state: string
                    shipping_pincode: string
                    subtotal: number
                    discount: number
                    shipping_cost: number
                    total: number
                    status: string | null
                    payment_method: string
                    payment_status: string | null
                    payment_id: string | null
                    tracking_number: string | null
                    estimated_delivery: string | null
                    delivered_at: string | null
                    notes: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    order_number: string
                    user_id?: string | null
                    shipping_name: string
                    shipping_phone: string
                    shipping_address_line1: string
                    shipping_address_line2?: string | null
                    shipping_city: string
                    shipping_state: string
                    shipping_pincode: string
                    subtotal: number
                    discount?: number
                    shipping_cost?: number
                    total: number
                    status?: string | null
                    payment_method: string
                    payment_status?: string | null
                    payment_id?: string | null
                    tracking_number?: string | null
                    estimated_delivery?: string | null
                    delivered_at?: string | null
                    notes?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    order_number?: string
                    user_id?: string | null
                    shipping_name?: string
                    shipping_phone?: string
                    shipping_address_line1?: string
                    shipping_address_line2?: string | null
                    shipping_city?: string
                    shipping_state?: string
                    shipping_pincode?: string
                    subtotal?: number
                    discount?: number
                    shipping_cost?: number
                    total?: number
                    status?: string | null
                    payment_method?: string
                    payment_status?: string | null
                    payment_id?: string | null
                    tracking_number?: string | null
                    estimated_delivery?: string | null
                    delivered_at?: string | null
                    notes?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "orders_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string | null
                    variant_id: string | null
                    product_name: string
                    product_sku: string | null
                    color: string | null
                    size: string | null
                    price: number
                    quantity: number
                    subtotal: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    product_id?: string | null
                    variant_id?: string | null
                    product_name: string
                    product_sku?: string | null
                    color?: string | null
                    size?: string | null
                    price: number
                    quantity: number
                    subtotal: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    product_id?: string | null
                    variant_id?: string | null
                    product_name?: string
                    product_sku?: string | null
                    color?: string | null
                    size?: string | null
                    price?: number
                    quantity?: number
                    subtotal?: number
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "order_items_order_id_fkey"
                        columns: ["order_id"]
                        referencedRelation: "orders"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "order_items_product_id_fkey"
                        columns: ["product_id"]
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "order_items_variant_id_fkey"
                        columns: ["variant_id"]
                        referencedRelation: "product_variants"
                        referencedColumns: ["id"]
                    }
                ]
            }
            reviews: {
                Row: {
                    id: string
                    product_id: string
                    user_id: string
                    order_id: string | null
                    rating: number
                    title: string | null
                    comment: string | null
                    is_verified_purchase: boolean
                    is_approved: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    user_id: string
                    order_id?: string | null
                    rating: number
                    title?: string | null
                    comment?: string | null
                    is_verified_purchase?: boolean
                    is_approved?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    user_id?: string
                    order_id?: string | null
                    rating?: number
                    title?: string | null
                    comment?: string | null
                    is_verified_purchase?: boolean
                    is_approved?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "reviews_order_id_fkey"
                        columns: ["order_id"]
                        referencedRelation: "orders"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "reviews_product_id_fkey"
                        columns: ["product_id"]
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "reviews_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            review_images: {
                Row: {
                    id: string
                    review_id: string
                    image_url: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    review_id: string
                    image_url: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    review_id?: string
                    image_url?: string
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "review_images_review_id_fkey"
                        columns: ["review_id"]
                        referencedRelation: "reviews"
                        referencedColumns: ["id"]
                    }
                ]
            }
            promo_codes: {
                Row: {
                    id: string
                    code: string
                    description: string | null
                    discount_type: string
                    discount_value: number
                    min_order_value: number
                    max_discount: number | null
                    usage_limit: number | null
                    used_count: number
                    valid_from: string
                    valid_until: string | null
                    is_active: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    code: string
                    description?: string | null
                    discount_type: string
                    discount_value: number
                    min_order_value?: number
                    max_discount?: number | null
                    usage_limit?: number | null
                    used_count?: number
                    valid_from?: string
                    valid_until?: string | null
                    is_active?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    code?: string
                    description?: string | null
                    discount_type?: string
                    discount_value?: number
                    min_order_value?: number
                    max_discount?: number | null
                    usage_limit?: number | null
                    used_count?: number
                    valid_from?: string
                    valid_until?: string | null
                    is_active?: boolean
                    created_at?: string
                }
                Relationships: []
            }
            notifications: {
                Row: {
                    id: string
                    user_id: string
                    type: string
                    title: string
                    message: string
                    link: string | null
                    is_read: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    type: string
                    title: string
                    message: string
                    link?: string | null
                    is_read?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    type: string
                    title?: string
                    message?: string
                    link?: string | null
                    is_read?: boolean
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "notifications_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
