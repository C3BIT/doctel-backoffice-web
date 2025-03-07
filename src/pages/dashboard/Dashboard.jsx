import ProfileSection from "./ProfileSection";
import DoctorOnDemand from "./DoctorOnDemand";
import ServiceCard from "./ServiceCard";
import PrescriptionSection from "./PrescriptionSection";
import LabReportSection from "./LabReportSection";
import PaperPrescriptionSection from "./PaperPrescriptionSection";

const Dashboard = () => {
    return (
        <div className="bg-white min-h-screen p-4 font-sans">
            <div className="max-w-5xl xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-4">
                    <ProfileSection />
                    <DoctorOnDemand />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ServiceCard
                            image="https://img.freepik.com/free-vector/videocalling-with-therapist_23-2148517118.jpg?t=st=1741243266~exp=1741246866~hmac=0a1f3acc6e0991a9b58f6284ed0abf4625f2c2317f93c82d5ff0cf04e3102047&w=900"
                            title="Contact Free"
                            description="Connect with us anytime for free"
                            buttonText="Chat Now"
                        />
                        <ServiceCard
                            image="https://img.freepik.com/free-vector/humanitarian-help-people-donating-sanitary-protection-equipment-concept-illustration_114360-1775.jpg?t=st=1741243717~exp=1741247317~hmac=58a2bee738bc3fecbcdbf5f00372b48b5c19761857af283563dcea7cd8e8aa3a&w=900"
                            title="Buy Package"
                            description="Buy health package & get 24x7 consultation"
                            buttonText="Buy Now"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <PrescriptionSection />
                    <LabReportSection />
                    <PaperPrescriptionSection />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;