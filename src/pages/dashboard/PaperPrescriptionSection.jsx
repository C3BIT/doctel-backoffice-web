import { ArrowRight } from "lucide-react";

const PaperPrescriptionSection = () => {
  return (
    <div className="bg-[#F5F6F8] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium text-lg text-start text-gray-600">Paper Prescription</h3>
          <p className="text-gray-600 text-sm text-start">
            List of your electronic prescriptions.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-start bg-[#E2F1FF] text-blue-500 rounded-lg px-3 py-1 text-sm">
            Upload
          </button>
          <button className="text-gray-500 border rounded-md bg-[#E2F1FF] p-1 border-blue-300">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaperPrescriptionSection;