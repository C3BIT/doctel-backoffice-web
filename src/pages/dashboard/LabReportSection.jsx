import { ArrowRight, Eye, Pencil, Trash } from "lucide-react";

const LabReportSection = () => {
  return (
    <div className="bg-[#F5F6F8] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium text-lg text-start text-gray-600">Lab Report</h3>
        </div>
        <div className="flex gap-2">
          <button className="text-start bg-[#E2F1FF] text-blue-500 rounded-lg px-3 py-1 text-sm">
            Upload
          </button>
          <button className="text-gray-500 border border-blue-300 rounded-md bg-[#E2F1FF] p-1">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lab Reports List */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex justify-between items-center border-t border-gray-500 pt-4"
          >
            <div className="flex">
              <div className="mr-4 text-blue-500">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                    fill="#2563EB"
                    fillOpacity="0.1"
                    stroke="#2563EB"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium text-start">12 Oct 2022</p>
                <p className="text-gray-500 text-sm text-start">01: 33 pm</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-1 rounded-md border border-blue-500 bg-[#E2F1FF] text-blue-400">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-md border border-orange-400 bg-[#FFEAD8] text-blue-400">
                <Pencil className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-md border border-red-400 bg-[#FFECEA] text-blue-400">
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-right mt-4 border-t border-gray-500 pt-4">
        <button className="text-gray-500 text-sm text-start">View all</button>
      </div>
    </div>
  );
};

export default LabReportSection;