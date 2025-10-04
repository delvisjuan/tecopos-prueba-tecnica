const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 animate-pulse">
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 p-4">
        <div className="flex items-center justify-between">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <div className="w-5 h-5 bg-gray-400 rounded"></div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        
        <div className="space-y-3">
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-2/3"></div>
          </div>
          
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
