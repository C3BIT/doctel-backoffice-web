const ProfileSection = () => {
    return (
      <div className="bg-[#F5F6F8] rounded-lg p-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <img
              src="https://s3-alpha-sig.figma.com/img/f5d1/626b/58c7efc77645ec3d92f9810aa546723d?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=acGbZeTMacggeZ2Hsyf2td~ia2LEUhRPcNXViWtacB0Sg1i5RUZa1xEp9MvUMslnkIjhNK~Ob1PwuEssyc6xXdQLu6SBszLtKrZ5yxEdkzwcyWrOWBPkDyFKWbR4xGqnpv4TMxOkGT3mfraH3jou1RyleINYrkxYXXnCzI74-zA3MIIOqOYupE8FfFyYn9ek~O23zNr41E6pXiuSo~Wk19IwCg2MZggpvQxzWxOCQsYF4rMEG5JfutvahKRS7gDy6MYjdlPdCcvnxr7SCrI7ziR6QylYEsnKUa3vbbTgfpu6ivMrEMmKPwWfiOcd7bUBM8HlE-NecDpB8nDGkK2XFg__"
              alt="Profile"
              className="w-16 h-16 rounded-lg object-cover border border-gray-200"
            />
          </div>
          <div>
            <p className="text-gray-500 text-sm text-start">Welcome</p>
            <h2 className="text-blue-600 font-medium text-xl text-start">Ahmed Ali</h2>
            <p className="text-gray-700 text-sm mt-1 text-start">8801710575743</p>
            <p className="text-gray-700 text-sm mt-2 text-start">
              You are subscribe on <span className="font-medium text-start">Monthly Pack.</span>
            </p>
            <p className="text-gray-700 text-sm text-start">
              Next renewal <span className="text-blue-600 font-medium text-start">31 December 2022</span>
            </p>
          </div>
        </div>
        <button className="text-start px-4 py-1 border border-blue-500 text-blue-500 rounded-md text-sm bg-[#FFECEA]">
          Details
        </button>
      </div>
    );
  };
  
  export default ProfileSection;