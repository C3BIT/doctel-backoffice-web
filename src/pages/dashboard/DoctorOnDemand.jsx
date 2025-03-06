const DoctorOnDemand = () => {
    return (
      <div className="bg-[#0052A8] rounded-lg p-6 flex items-center justify-between text-white">
        <div className="flex items-center">
          <div className="bg-blue-700 p-2 rounded-full mr-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 7C16 9.21 14.21 11 12 11C9.79 11 8 9.21 8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7Z" fill="white" />
              <path d="M12 14C8.13 14 5 17.13 5 21H19C19 17.13 15.87 14 12 14Z" fill="white" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-xl text-start">Doctor on Demand</h3>
            <p className="text-sm text-blue-100 text-start">24x7 Consultation without appointment.</p>
          </div>
        </div>
        <button className="text-start bg-[#F5F6F8] text-blue-600 font-medium px-4 py-2 rounded-lg flex items-center">
          <svg
            className="mr-2"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.1 14.8 15.7 14.9 15.5 15.1L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.9 8.5C9.1 8.3 9.2 7.9 9.1 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.4 8 3 7.5 3H4C3.4 3 3 3.4 3 4C3 13.4 10.6 21 20 21C20.6 21 21 20.6 21 20V16.5C21 15.9 20.6 15.5 20 15.5Z"
              fill="#2563EB"
            />
          </svg>
          Call Now
        </button>
      </div>
    );
  };
  
  export default DoctorOnDemand;