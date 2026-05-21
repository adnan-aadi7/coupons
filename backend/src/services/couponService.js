const Coupon = require('../models/Coupon');
const Deal = require('../models/Deal');

/**
 * Service to handle coupon-related business logic
 */
class CouponService {
  /**
   * Get filtered and sorted coupons/deals
   * @param {Object} filters - brand, category, store
   * @param {string} sort - popularity, newest, expiry
   * @param {number} limit - max results
   */
  async getCoupons({ brand, category, store, sort, type, limit = 0 }) {
    let query = { 
      isActive: true
    };

    let conditions = [
      {
        $or: [
          { expiryDate: { $exists: false } },
          { expiryDate: null },
          { expiryDate: { $gte: new Date() } }
        ]
      }
    ];

    if (brand) conditions.push({ brand: new RegExp(brand, 'i') });
    if (store) conditions.push({ store: new RegExp(store, 'i') });

    if (category) {
      const mapping = {
        // Fashion
        'fashion': ['одежда', 'обувь', 'аксессуары', 'fashion', 'clothing'],
        // Electronics
        'electronics': ['электроника', 'бытовая техника', 'electronics'],
        // Travel - Билеты на самолеты + мероприятия
        'travel': ['билеты', 'туризм', 'путешествия', 'отели', 'travel'],
        // Computing - Программы и IT-сервисы
        'computing': ['программы', 'it-сервисы', 'компьютер', 'computing', 'software', 'утилиты'],
        // Internet Services - Интернет-услуги
        'services': ['интернет-услуги', 'интернет услуги', 'services'],
        'internetservices': ['интернет-услуги', 'интернет услуги', 'services'],
        // Online Shopping - Интернет-магазины
        'onlineshopping': ['интернет-магазины', 'интернет магазины', 'online shopping'],
        'shopping': ['интернет-магазины', 'интернет магазины', 'shopping'],
        // Food & Dining - Доставка еды
        'fooddining': ['доставка еды', 'еда', 'доставка', 'продукты', 'food', 'dining'],
        'food': ['доставка еды', 'еда', 'доставка', 'продукты', 'food'],
        // Education - Онлайн-образование
        'education': ['образование', 'онлайн-образование', 'обучение', 'education'],
        // Gaming - Онлайн-игры
        'gaming': ['онлайн-игры', 'игры', 'gaming'],
        // Kids - Игрушки и товары для детей
        'kids': ['игрушки', 'детей', 'дети', 'детские', 'kids', 'baby'],
        // Books - Книги
        'books': ['книги', 'книга', 'books'],
        // Fallbacks
        'luxury': ['ювелирные', 'luxury', 'premium'],
        'homeliving': ['дом', 'мебель', 'home', 'living'],
        'sports': ['спорт', 'фитнес', 'sports', 'fitness'],
        'healthbeauty': ['здоровье', 'красота', 'аптеки', 'health', 'beauty', 'косметика'],
        'automotive': ['авто', 'мото', 'automotive', 'car'],
      };

      const key = category.toLowerCase().replace(/[^a-z0-9]/g, '');
      const keywords = mapping[key] || [category];
      
      conditions.push({
        $or: keywords.map(kw => ({ category: new RegExp(kw, 'i') }))
      });
    }

    query.$and = conditions;

    let sortBy = { popularity: -1 };
    if (sort === 'newest') sortBy = { createdAt: -1 };
    if (sort === 'expiry') sortBy = { expiryDate: 1 };
    if (sort === 'cashback') sortBy = { discountValue: -1 };

    const Model = type === 'deal' ? Deal : Coupon;
    const queryExec = Model.find(query).sort(sortBy);
    if (limit && limit > 0) {
      queryExec.limit(limit);
    }
    return await queryExec;
  }

  /**
   * Create a new coupon/deal
   * @param {Object} couponData 
   */
  async createCoupon(couponData) {
    const Model = couponData.type === 'deal' ? Deal : Coupon;
    return await Model.create(couponData);
  }
}

module.exports = new CouponService();
