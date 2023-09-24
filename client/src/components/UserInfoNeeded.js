import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { userState } from "../GlobalState";
import log from "../helpers/logging";
import { useReactiveVar } from "@apollo/client";

function UserInfoNeeded({messageStatus, setMessageStatus}) {
	const user = useReactiveVar(userState);

	const handleDismiss = () => {
  		axios
			.patch(`${process.env.REACT_APP_BE_URL}/teamForward/${user._id}`, {dismissedUpdateProfileMessage: true })
			.then(() => setMessageStatus(true))
			.catch((err) => (
        log(err)
			));
	};

	return (
		<div className="mx-auto my-4">
			<div className="block max-w-sm rounded-lg bg-slate-200 shadow-lg text-center text-sm px-3 py-3">
				Please update your user profile to enhance your experience with the app.
				<div className="p-1 underline">
					<Link to="/updateProfile"> Edit Here</Link>
					<div type="link" onClick={() => handleDismiss()}>
						Dismiss
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserInfoNeeded;
