import { BitcoinIconsArrowLeftFilled} from '../../assets/userIcons/ProfileIcon';
import { FaCamera } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axiosInstance from '../../utils/user/axiosInstance'


const categories = [
  "Science",
  "Technology",
  // "Engineering",
  "Mathematics",
  "History",
  "Languages",
  "Business",
  "Finance",
  "Personal Development",
  "Arts",
];

const NewCreateSession = () => {

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [sessionData, setSessionData] = useState({
    title: '',
    introduction:'',
    // duration: '',
    fee: '',
    descriptionTitle: '',
    description: '',
    // rawTimeSlots: '',
    coverImage: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [deleteImage, setDeleteImage] = useState(false); // Track if image should be deleted
  const [imageStatus, setImageStatus] = useState('unchanged'); // Tracks image status

    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [newTimeSlot, setNewTimeSlot] = useState<string>('');

    const [selectedCategory, setSelectedCategory] = useState('');
  
    // Function to add a new time slot
    const addTimeSlot = () => {
      if (newTimeSlot) {
        setTimeSlots([...timeSlots, newTimeSlot]);
        setNewTimeSlot('');
      }
    };

    console.log("out side timeeeeeeeeeeeeeeeeeeeeeeeeeeee",timeSlots);
    
  
    // Function to remove a time slot, with `index` typed as a number
    const removeTimeSlot = (index: number) => {
      setTimeSlots(timeSlots.filter((_, i) => i !== index));
    };

    function convertRailwayTimeTo12Hour(railwayTime: string): string {
        // Implement your conversion logic here
        // Example logic (replace with your actual implementation):
        let hours = parseInt(railwayTime.slice(0, 2));
        const minutes = railwayTime.slice(2);
        let amPm = 'AM';
      
        if (hours === 12) {
          amPm = 'PM';
        } else if (hours > 12) {
          hours -= 12;
          amPm = 'PM';
        }
      
        const convertedTime = `${hours.toString().padStart(2, '0')}:${minutes} ${amPm}`;
        return convertedTime;
      }


// time slots
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [displayDuration, setDisplayDuration] = useState('');

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive values or empty string
    if (value === '' || /^[0-9]*$/.test(value)) {
      setHours(value);
      updateDisplayDuration(value, minutes);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive values or empty string
    if (value === '' || /^[0-9]*$/.test(value)) {
      setMinutes(value);
      updateDisplayDuration(hours, value);
    }
  };

  const updateDisplayDuration = (hrs: string, mins: string) => {
    let durationString = '';

    // Convert values to integers for display
    const hoursInt = parseInt(hrs) || 0;
    const minutesInt = parseInt(mins) || 0;

    if (hoursInt > 0) {
      durationString += `${hoursInt} hr`;
    }
    if (minutesInt > 0) {
      durationString += ` ${minutesInt} min`;
    }

    setDisplayDuration(durationString.trim());
  };



  // Handler to update sessionData
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setSessionData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  
  // image preview
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    

    if (file && file.type.match('image.*')) {  // validate image file type
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setDeleteImage(false); // Reset delete flag if a new image is selected
      // setImageStatus('updated'); // Set status to updated if a new image is selected

    } else {
      alert("Please select a valid image file (jpg, png, etc.)");
    }

    // Reset the file input value to allow re-selection of the same file if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteImage = () => {
    setSessionData(prevData => ({
      ...prevData,
      profilePic: '', // Clears existing image in the state
    }));
    setSelectedImage(null);
    setImagePreview(''); // Reset image preview

    // Clear the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setDeleteImage(true); // Set delete flag
    // setImageStatus('deleted'); // Set status to deleted
  };


  





  const isValidName = (name: any) => /^[A-Za-z\s.,-]+$/.test(name);
  const isValidNumber = (value: any) => /^[0-9]+$/.test(value); // Checks if the input is only numbers
  const isNotEmptyString = (value: any) => value.trim().length > 0; // Checks for non-empty input with non-space characters


  const handleSave = async() => {
    console.log("displayDuration-------------",displayDuration);
    console.log("hours",hours);
    console.log("session duration", `${hours} : ${minutes}`);
    
    
    
    if (!sessionData.title ) {
      alert("Title required.");
      return;
    }
    if (!isNotEmptyString(sessionData.title)) {
      alert("Title required. Please provide a valid input.");
      return;
    }
    if (!sessionData.introduction ) {
      alert("Introduction required.");
      return;
    }
    if (!isNotEmptyString(sessionData.introduction)) {
      alert("Introduction required. Please provide a valid input.");
      return;
    }
    if (!hours ) {
      alert("Duration required.");
      return;
    }
    if (!isNotEmptyString(hours)) {
      alert("Duration required. Please provide a valid input.");
      return;
    }
    if (!sessionData.fee) {
      alert("Fees required.");
      return;
    }
    if (!isValidNumber(sessionData.fee)) {
      alert("Fees must be a valid number.");
      return;
    }
    if (!isNotEmptyString(sessionData.fee)) {
      alert("Fee required. Please provide a valid input.");
      return;
    }
    if (!sessionData.descriptionTitle ) {
      alert("Description title required.");
      return;
    }
    if (!isNotEmptyString(sessionData.descriptionTitle)) {
      alert("Description title required. Please provide a valid input.");
      return;
    }
    if (!sessionData.description ) {
      alert("Description required.");
      return;
    }
    if (!isNotEmptyString(sessionData.description)) {
      alert("Description required. Please provide a valid input.");
      return;
    }
    
    if (!selectedCategory) {
      alert("Category required. Please select a category.");
      return;
    }
    
    if (!timeSlots) {
      alert("Time slots required.");
      return;
    }
    if (!selectedImage) {
      alert("Image required. Please provide a valid input.");
      return;
    }


    // Code to submit form data
    console.log("session data :-----------", sessionData);

    console.log("time slotsssssssssssssss", timeSlots);
    

   

      const formData = new FormData();
      formData.append("title", sessionData.title);
      formData.append("introduction", sessionData.introduction);
      formData.append("duration", `${hours} : ${minutes}`);
      formData.append("fee", sessionData.fee);
      formData.append("descriptionTitle", sessionData.descriptionTitle);
      formData.append("description", sessionData.description);
      formData.append("category", selectedCategory);
      formData.append("rawTimeSlots", timeSlots.join(","));
      formData.append("coverImage", sessionData.coverImage);// Append image status to track image update


      // Add the session image file if selected
      console.log("selected image........", selectedImage);
      
      
      // if (selectedImage && imageStatus === 'updated') {
      //   formData.append("profilePic", selectedImage); // Add new image if selected
      // } else if (deleteImage) {
      //   formData.append("profilePic", ""); // Empty value to indicate image deletion
      // }

        formData.append("coverImage", selectedImage ); // Add new image if selected



    try {
      // Making a PUT request to update profile
      const response = await axiosInstance.post('/instructor/create-session', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("session created , response.data", response.data);
      alert("Session created successfully!");
      navigate('/instructor/profile');



    } catch (error) {
      console.error("Error creating new session:", error);
      alert("Failed to create new session. Please try again.");
    }
  };
  

  return (
    <>
      <div className='w-screen h-auto bg-white overflow-x-hidden'>


        {/* white parent div */}
            
                <div className='ml-64 mt-10 mb-20 pl-10 pt-10 pb-10 bg-white w-8/12 h-auto  rounded-2xl shadow-2xl shadow-[#c3e3d7] flex flex-col'>

                    <div className='flex items-center space-x-72'>
                        <Link to="/instructor/sessions">
                            <div className='border border-gray-400 w-10 h-10 rounded-full cursor-pointer hover:border-blue-700 flex items-center justify-center hover:bg-[#3ee1a6] transition duration-300'>
                                <span className="text-black text-xl">←</span>
                            </div>
                        </Link>

                        <div className='text-black'> 
                            <h1 className='font-semibold text-xl font-serif'>Create New Session</h1>
                        </div> 
                    </div> 


                    <div className=' space-y-7 pt-14 flex-grow rounded-bl-3xl rounded-br-3xl'>

                        <div className='flex w-full ml-64 h-10 space-x-14'>
                            <p className='w-2/12 text-black font-semibold text-sm font-serif'>Session Title</p>
                            <input 
                                type="text" 
                                placeholder='Title' 
                                name="title" 
                                value={sessionData.title} 
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md w-4/12 text-black text-sm placeholder:text-xs px-2' />
                        </div>
                        <hr className='ml-60 mr-48 text-black ' />




                        <div className='flex w-full ml-64 h-10 space-x-14'>
                            <p className='w-2/12 text-black font-semibold text-sm font-serif'>Session Overview</p>
                            <input 
                                type="text" 
                                placeholder='Introduction' 
                                name="introduction" 
                                value={sessionData.introduction} 
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md w-4/12 text-black text-sm placeholder:text-xs px-2' />
                        </div>
                        <hr className='ml-60 mr-48 text-black ' />
                  


                    <div className='flex w-full ml-64 h-7 space-x-28'>
                        <p className='text-black font-bold text-sm'>Session Duration</p>

                        <div className='flex items-center space-x-2'>
                            
                            <input
                            type="number"
                            placeholder='Hours'
                            value={hours}
                            onChange={handleHoursChange}
                            className='border border-gray-300 py-1 rounded-md text-black text-sm w-20 placeholder:text-xs pl-2'
                            />
                            
                            <input
                            type="number"
                            placeholder='Minutes'
                            value={minutes}
                            onChange={handleMinutesChange}
                            className='border border-gray-300 py-1 rounded-md text-black text-sm w-20 placeholder:text-xs pl-2'
                            />
                            <p className='text-red-500'>:</p>

                            <input
                            type="text"
                            value={displayDuration}
                            readOnly
                            className='border border-red-300 py-1 rounded-md text-black text-sm w-32 placeholder:text-xs pl-2'
                            />
                        </div>
                        </div>
                        <hr className='ml-60 mr-48 text-black ' />



                        <div className='flex w-full ml-64 h-10 space-x-14'>
                            <p className='w-2/12 text-black font-semibold text-sm font-serif'>Session Fee</p>
                            <input 
                                type="text" 
                                placeholder='Fee' 
                                name="fee" 
                                value={sessionData.fee} 
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md w-4/12 text-black text-sm placeholder:text-xs px-2' />
                        </div>
                        <hr className='ml-60 mr-48 text-black ' />

                  


                        <div className='flex w-full ml-64 h-10 space-x-14'>
                            <p className='w-2/12 text-black font-semibold text-sm font-serif'>Description Title</p>
                            <input 
                                type="text" 
                                placeholder='Description Title' 
                                name="descriptionTitle" 
                                value={sessionData.descriptionTitle} 
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md w-4/12 text-black text-sm placeholder:text-xs px-2' />
                        </div>
                        <hr className='ml-60 mr-48 text-black ' />






                        <div className='flex w-full ml-64 h-10 space-x-14'>
                            <p className='w-2/12 text-black font-semibold text-sm font-serif'>Session Description</p>
                            <input 
                                type="text" 
                                placeholder='Description' 
                                name="description" 
                                value={sessionData.description} 
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md w-4/12 text-black text-sm placeholder:text-xs px-2' />
                        </div>
                        <hr className='ml-60 mr-48 text-black ' />








                        <div className='flex w-full ml-64 h-10 space-x-14'>
                            <p className='w-2/12 text-black font-semibold text-sm font-serif'>Session Category</p>
                            {/* <input 
                                type="text" 
                                placeholder='Description' 
                                name="description" 
                                value={sessionData.description} 
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md w-4/12 text-black text-sm placeholder:text-xs px-2' /> */}
                            
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className='border border-gray-300 rounded-md w-4/12 text-black text-sm px-2'
                              >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                  <option key={category} value={category}>
                                    {category}
                                  </option>
                                ))}
                              </select>

                        </div>
                        <hr className='ml-60 mr-48 text-black ' />





                  <div className='flex w-full ml-64 h-7 space-x-20'>
                    <div className='space-y-2'>
                      <p className='text-black font-bold text-sm font-serif'>Cover image</p>
                      {/* <p className='text-gray-500 font-normal text-xs'>Update your Photo</p> */}
                    </div>



                    <div className="flex space-x-8 items-center">
                      {/* Display Image Preview */}{/* Display profile picture if it exists */}
                      {sessionData.coverImage || imagePreview ? (
                        <img src={imagePreview || sessionData.coverImage}
                          alt="Profile Preview" className="ml-12 w-11 h-11 object-cover rounded-lg"
                        />
                      ) : (
                        <div
                          className="ml-14 w-11 h-11 flex items-center justify-center bg-black rounded-full cursor-pointer relative"
                          onClick={() => fileInputRef.current && fileInputRef.current.click()} // Trigger file input on click
                        >
                          <FaCamera className="text-white" />
                        </div>
                      )}

                      {/* File Input */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef} // Attach ref
                        className="opacity-0 absolute inset-0 w-11 h-11 cursor-pointer"
                      />

                      {/* Delete Button */}
                      {(sessionData.coverImage || imagePreview) && (
                        <button
                          onClick={handleDeleteImage}
                          className="text-red-500 font-bold text-xs"
                        > Delete </button>
                      )}
                    </div>


                  </div>
                  <hr className='ml-60 mr-48 text-black ' />






                  {/* Time Slot Section */}
                    <div className='flex w-full ml-64 h-7'>
                        <p className='text-black font-bold text-sm font-serif'>Add Time Slots</p>
                        <input
                            type="time"
                            value={newTimeSlot}
                            onChange={(e) => setNewTimeSlot(e.target.value)}
                            placeholder="hr : min : sec"
                            className='ml-28 py-4 px-2 w-4/12 text-sm border border-gray-300 rounded-md text-black placeholder:text-xs '
                        />
                        <button onClick={addTimeSlot} className='ml-5 bg-blue-800 h-7 px-3 rounded-md text-white text-sm'>Add</button>
                    </div>

                    {/* Display Added Time Slots */}
                    <div className='ml-64 mt-4 space-y-2'>
                        {timeSlots.length > 0 && ( 
                            <div className='p-3 h-auto w-48 rounded-lg shadow space-y-3'>
                                <p className='text-blue-800 font-bold text-sm'>Scheduled Times</p>
                                <hr className='w-32'/>
                                <ul className='list-disc ml-8'>
                                    {timeSlots.map((time, index) => (
                                    <li key={index} className='flex items-center space-x-5'>
                                        <span className='text-black text-sm -ml-9'>
                                            {convertRailwayTimeTo12Hour(time)}
                                        </span>
                                        <button onClick={() => removeTimeSlot(index)} className='text-red-500 text-xs font-bold'>
                                        Remove
                                        </button>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <hr className='ml-60 mr-48 text-black ' />

                </div>



                <button className='mt-14 ml-96 w-32 text-black border border-black bg-[#3ee1a6] hover:bg-primary-orange h-8 px-4 rounded-full mr-10' onClick={handleSave}>
                    Save
                </button>

            </div>



      </div>
    </>
  )
}

export default NewCreateSession;
