import React, { useEffect, useState } from 'react';
import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
} from 'agora-rtc-react';
import MeetingComponent from '../components/LiveVideoPage/MeetingComponent';
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetingDetails, fetchMessages, joinMeeting } from '../services/operations/MEETING_API';

export default function LiveVideoPage() {
    const dispatch = useDispatch();
    const [activeConnection, setActiveConnection] = useState(true);
    const [meetingDetails, setMeetingDetails] = useState(null);
    const { uid, channel } = useParams();
    const { token } = useSelector((state) => state.auth);

    const getMeetingDetails = async () => {
        const data = await dispatch(fetchMeetingDetails({ channel, uid }, token));
        setMeetingDetails(data);
        setActiveConnection(true);
    };

    useEffect(() => {
        getMeetingDetails();

        return () => {
            setMeetingDetails(null);
        };
    }, [channel, uid, token]);

    return (
        <>
        {meetingDetails && <MeetingComponent meetingDetails={meetingDetails}  activeConnection={activeConnection} uid={uid} channel={channel} token={token}/>}
        </>

    )
}