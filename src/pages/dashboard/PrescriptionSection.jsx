import { ArrowRight } from "lucide-react";

const PrescriptionSection = () => {
  return (
    <div className="bg-[#F5F6F8] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium text-lg text-start text-gray-600">E-Prescription</h3>
          <p className="text-gray-600 text-sm text-start">
            List of your electronic prescriptions.
          </p>
        </div>
        <button className="text-gray-500 border rounded-md bg-[#E2F1FF] border-blue-300 p-1">
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PrescriptionSection;