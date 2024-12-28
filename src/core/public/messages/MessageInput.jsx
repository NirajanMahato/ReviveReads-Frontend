import { BsSend } from "react-icons/bs";
const MessageInput = () => {
	return (
		<form className='md:px-8 px-4 my-3 md:pb-3 pb-1'>
			<div className='w-full flex gap-3'>
				<input
					type='text'
					className='border rounded-lg block w-full p-2.5'
					placeholder='Type your message...'
				/>
				<button type='submit' className='flex items-center px-3 rounded-lg  bg-gray-700 border-gray-600 text-white'>
					Send
				</button>
			</div>
		</form>
	);
};
export default MessageInput;