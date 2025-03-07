const ServiceCard = ({ image, title, description, buttonText }) => {
    return (
      <div className="bg-[#F5F6F8] rounded-lg p-6 flex flex-col justify-between">
        <div>
          <img src={image} alt={title} className="h-32 w-32 object-cover rounded-lg mb-4" />
          <h3 className="font-medium text-lg mb-2 text-start text-gray-600">{title}</h3>
          <p className="text-gray-600 text-sm mb-6 text-start">{description}</p>
        </div>
        <div className="flex justify-end">
          <button className="w-1/3 border border-blue-500 text-gray-700 font-semibold rounded-lg py-2 text-sm bg-[#E2F1FF]">
            {buttonText}
          </button>
        </div>
      </div>
    );
  };
  
  export default ServiceCard;