import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchStores } from '@/redux/slices/storeSlice';
import { Search, ChevronDown } from 'lucide-react';
import StoreExplorerSidebar from './StoreExplorerSidebar';
import StoreCard from './StoreCard';
export default function StoreExplorer() {
  const [activeCategory, setActiveCategory] = useState('All Stores');
  const [searchQuery, setSearchQuery] = useState('');
  
  const dispatch = useDispatch<AppDispatch>();
  const { stores, loading, error } = useSelector((state: RootState) => state.stores);

  useEffect(() => {
    dispatch(fetchStores({ 
      category: activeCategory === 'All Stores' ? undefined : activeCategory,
      search: searchQuery
    }));
  }, [dispatch, activeCategory, searchQuery]);

  const filteredStores = stores; // Backend already filters, but we can refine here if needed

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-['Manrope'] pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-[42px] md:text-[56px] font-black text-[#1A1C1C] tracking-tight">
            Explore Our Partners
          </h1>
          <p className="text-slate-500 text-[18px] max-w-[700px] mx-auto leading-relaxed">
            Connect with over {stores.length}+ premium retailers and unlock exclusive wealth-generating rewards on every purchase.
          </p>

          {/* Search Bar */}
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="relative max-w-[700px] mx-auto mt-10"
          >
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FF9800]">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text"
              placeholder="Search for your favorite brand..."
              className="w-full h-[72px] bg-white rounded-full pl-16 pr-48 shadow-xl shadow-slate-200/50 border-none focus:ring-2 focus:ring-[#FF9800] transition-all text-lg font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 h-[56px] px-10 bg-[#FF9800] text-white rounded-full font-black text-[15px] hover:bg-[#F57C00] transition-all shadow-lg shadow-orange-200">
              Find Store
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <StoreExplorerSidebar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          <main className="lg:col-span-9">
            {loading && stores.length === 0 ? (
               <div className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-[#FF9800] border-t-transparent rounded-full animate-spin" />
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                
                {/* Featured Store Card (Dynamically pick first featured store) */}
                {stores.length > 0 && (
                  <div className="md:col-span-1 xl:col-span-1 h-full">
                    <div className="bg-[#1A1C1C] rounded-[40px] p-10 text-white relative overflow-hidden h-full group min-h-[400px] flex flex-col justify-end">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                      <img 
                        src={(() => {
                          const { getProxyLogoUrl } = require('@/utils/imageHelper');
                          return getProxyLogoUrl(stores[0].logoUrl, stores[0].slug);
                        })()} 
                        alt="Featured"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[10s] group-hover:scale-110"
                      />
                      <div className="relative z-20 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest">
                          Top Choice
                        </div>
                        <div>
                          <h2 className="text-4xl font-black mb-4">{stores[0].name}</h2>
                          <p className="text-white/60 font-bold leading-relaxed max-w-[300px]">
                            {stores[0].description || "Unlock exclusive yields and professional rewards on every purchase."}
                          </p>
                        </div>
                        <button className="w-full py-5 bg-white text-[#1A1C1C] rounded-2xl font-black text-[15px] hover:bg-[#FF9800] hover:text-white transition-all shadow-xl">
                          Shop Now — {stores[0].cashbackRate}% Back
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Regular Store Cards */}
                {filteredStores.slice(stores.length > 0 ? 1 : 0).map((store, i) => (
                  <StoreCard key={store._id} store={store} idx={i} />
                ))}

              </div>
            )}

            {stores.length === 0 && !loading && (
              <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold text-lg">No stores found matching your criteria.</p>
                <button 
                  onClick={() => { setActiveCategory('All Stores'); setSearchQuery(''); }}
                  className="mt-4 text-[#FF9800] font-black uppercase tracking-widest text-sm"
                >
                  Clear Filters
                </button>
              </div>
            )}

            <div className="mt-20 flex justify-center">
              <button className="flex items-center gap-3 px-12 py-5 bg-white border border-slate-200 rounded-full font-black text-[#1A1C1C] hover:border-[#FF9800] hover:text-[#FF9800] transition-all shadow-sm group">
                View More Partners
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
