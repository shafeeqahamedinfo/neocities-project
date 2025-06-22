// Product Data
const productsData = {
    men: [
        {
            id: 'men-1',
            name: 'Classic Leather Oxford',
            price: 2999,
            image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'formal',
            sizes: ['6', '7', '8', '9', '10', '11'],
            description: 'Premium leather oxford shoes perfect for formal occasions',
            features: ['Genuine leather upper', 'Cushioned insole', 'Durable rubber sole', 'Classic lace-up design']
        },
        {
            id: 'men-2',
            name: 'Casual Sneakers',
            price: 1999,
            image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'casual',
            sizes: ['6', '7', '8', '9', '10', '11'],
            description: 'Comfortable casual sneakers for everyday wear',
            features: ['Breathable mesh upper', 'Memory foam insole', 'Flexible rubber sole', 'Lace-up closure']
        },
        {
            id: 'men-3',
            name: 'Sports Running Shoes',
            price: 3499,
            image: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'sports',
            sizes: ['6', '7', '8', '9', '10', '11'],
            description: 'High-performance running shoes with advanced cushioning',
            features: ['Lightweight design', 'Air cushioning', 'Moisture-wicking lining', 'Grip sole']
        },
        {
            id: 'men-4',
            name: 'Leather Loafers',
            price: 2499,
            image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'casual',
            sizes: ['6', '7', '8', '9', '10', '11'],
            description: 'Elegant leather loafers for smart casual occasions',
            features: ['Premium leather', 'Slip-on design', 'Padded collar', 'Non-slip sole']
        },
        {
            id: 'men-5',
            name: 'Formal Derby Shoes',
            price: 3299,
            image: 'https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'formal',
            sizes: ['6', '7', '8', '9', '10', '11'],
            description: 'Classic derby shoes crafted from finest leather',
            features: ['Hand-crafted leather', 'Open lacing system', 'Leather sole', 'Traditional design']
        },
        {
            id: 'men-6',
            name: 'Canvas Sneakers',
            price: 1499,
            image: 'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'casual',
            sizes: ['6', '7', '8', '9', '10', '11'],
            description: 'Lightweight canvas sneakers for casual outings',
            features: ['Canvas upper', 'Rubber toe cap', 'Cushioned insole', 'Vulcanized sole']
        }
    ],
    women: [
        {
            id: 'women-1',
            name: 'Elegant Heels',
            price: 2799,
            image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'heels',
            sizes: ['5', '6', '7', '8', '9', '10'],
            description: 'Sophisticated heels perfect for special occasions',
            features: ['Premium materials', 'Comfortable heel height', 'Elegant design', 'Secure fit']
        },
        {
            id: 'women-2',
            name: 'Casual Flats',
            price: 1799,
            image: 'https://images.pexels.com/photos/1464624/pexels-photo-1464624.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'flats',
            sizes: ['5', '6', '7', '8', '9', '10'],
            description: 'Comfortable flats for everyday elegance',
            features: ['Soft leather', 'Cushioned sole', 'Versatile style', 'All-day comfort']
        },
        {
            id: 'women-3',
            name: 'Ankle Boots',
            price: 3199,
            image: 'https://images.pexels.com/photos/1464623/pexels-photo-1464623.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'boots',
            sizes: ['5', '6', '7', '8', '9', '10'],
            description: 'Stylish ankle boots for modern women',
            features: ['Durable construction', 'Side zip closure', 'Block heel', 'Weather resistant']
        },
        {
            id: 'women-4',
            name: 'Designer Sandals',
            price: 2299,
            image: 'https://images.pexels.com/photos/1464622/pexels-photo-1464622.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'sandals',
            sizes: ['5', '6', '7', '8', '9', '10'],
            description: 'Trendy sandals for summer fashion',
            features: ['Adjustable straps', 'Cushioned footbed', 'Stylish design', 'Lightweight']
        },
        {
            id: 'women-5',
            name: 'Platform Heels',
            price: 3499,
            image: 'https://images.pexels.com/photos/1464621/pexels-photo-1464621.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'heels',
            sizes: ['5', '6', '7', '8', '9', '10'],
            description: 'Statement platform heels for confident style',
            features: ['Platform sole', 'Stable heel', 'Premium finish', 'Eye-catching design']
        },
        {
            id: 'women-6',
            name: 'Ballet Flats',
            price: 1599,
            image: 'https://images.pexels.com/photos/1464620/pexels-photo-1464620.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'flats',
            sizes: ['5', '6', '7', '8', '9', '10'],
            description: 'Classic ballet flats for timeless appeal',
            features: ['Flexible sole', 'Bow detail', 'Comfortable fit', 'Classic style']
        }
    ],
    children: [
        {
            id: 'children-1',
            name: 'Colorful Sneakers',
            price: 1299,
            image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'sneakers',
            sizes: ['1', '2', '3', '4', '5', '6'],
            description: 'Fun and colorful sneakers for active kids',
            features: ['Bright colors', 'Easy velcro closure', 'Flexible sole', 'Durable materials']
        },
        {
            id: 'children-2',
            name: 'School Shoes',
            price: 1599,
            image: 'https://images.pexels.com/photos/1927258/pexels-photo-1927258.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'formal',
            sizes: ['1', '2', '3', '4', '5', '6'],
            description: 'Comfortable and durable shoes for school',
            features: ['Leather upper', 'Lace-up design', 'Sturdy construction', 'School appropriate']
        },
        {
            id: 'children-3',
            name: 'Sports Shoes',
            price: 1799,
            image: 'https://images.pexels.com/photos/1927257/pexels-photo-1927257.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'sports',
            sizes: ['1', '2', '3', '4', '5', '6'],
            description: 'Athletic shoes for young sports enthusiasts',
            features: ['Breathable mesh', 'Cushioned sole', 'Secure fit', 'Active support']
        },
        {
            id: 'children-4',
            name: 'Casual Sandals',
            price: 999,
            image: 'https://images.pexels.com/photos/1927256/pexels-photo-1927256.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'sandals',
            sizes: ['1', '2', '3', '4', '5', '6'],
            description: 'Comfortable sandals for summer play',
            features: ['Adjustable straps', 'Soft footbed', 'Water friendly', 'Easy to clean']
        },
        {
            id: 'children-5',
            name: 'Rain Boots',
            price: 1199,
            image: 'https://images.pexels.com/photos/1927255/pexels-photo-1927255.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'boots',
            sizes: ['1', '2', '3', '4', '5', '6'],
            description: 'Waterproof boots for rainy day adventures',
            features: ['Waterproof material', 'Easy pull-on', 'Non-slip sole', 'Fun patterns']
        },
        {
            id: 'children-6',
            name: 'Canvas Shoes',
            price: 899,
            image: 'https://images.pexels.com/photos/1927254/pexels-photo-1927254.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'casual',
            sizes: ['1', '2', '3', '4', '5', '6'],
            description: 'Lightweight canvas shoes for everyday wear',
            features: ['Canvas upper', 'Comfortable fit', 'Versatile style', 'Easy maintenance']
        }
    ]
};

// Category filters for each collection
const categoryFilters = {
    men: [
        { value: 'all', label: 'All Categories' },
        { value: 'formal', label: 'Formal' },
        { value: 'casual', label: 'Casual' },
        { value: 'sports', label: 'Sports' }
    ],
    women: [
        { value: 'all', label: 'All Categories' },
        { value: 'heels', label: 'Heels' },
        { value: 'flats', label: 'Flats' },
        { value: 'boots', label: 'Boots' },
        { value: 'sandals', label: 'Sandals' }
    ],
    children: [
        { value: 'all', label: 'All Categories' },
        { value: 'sneakers', label: 'Sneakers' },
        { value: 'formal', label: 'School Shoes' },
        { value: 'sports', label: 'Sports' },
        { value: 'sandals', label: 'Sandals' },
        { value: 'boots', label: 'Boots' },
        { value: 'casual', label: 'Casual' }
    ]
};

// Collection information
const collectionInfo = {
    men: {
        title: "Men's Collection",
        subtitle: "Stylish and comfortable footwear crafted for men"
    },
    women: {
        title: "Women's Collection", 
        subtitle: "Elegant and trendy fashion for women"
    },
    children: {
        title: "Children's Collection",
        subtitle: "Playful and cozy footwear for kids"
    }
};