import React, { useEffect, useState } from 'react'
import "./Sidebar.css";
import { IconButton, Avatar } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { auth } from './firebase';
import axios from './axios';
import Pusher from "pusher-js";

const pusher = new Pusher('7d2b6c1fbc4cbcf6c3a5', {
    cluster: 'ap2'
});

function Sidebar() {

    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    const getChannels = () => {
        axios.get('/get/channelList')
            .then((res) => {
                setChannels(res.data)
            })
    }

    useEffect(() => {
        getChannels();

        const channel = pusher.subscribe('channels');
        channel.bind('newChannel', function (data) {
            getChannels();
        });
    }, []);

    const handleAddChannel = () => {
        const channelName = prompt('Enter a new channel name');
        if (channelName) {
            axios.post('/new/channel', {
                channelName: channelName
            });
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Pierre Doumit</h3>
                <IconButton>
                    <ExpandMoreIcon />
                </IconButton>
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <IconButton>
                            <ExpandMoreIcon />
                        </IconButton>
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(channel => (
                        <SidebarChannel key={channel._id} id={channel._id} channelName={channel.channelName} />
                    ))}
                </div>
            </div>
            <div className="sidebar__voice">
                <SignalCellularAltIcon className='sidebar__voiceIcon' fontSize="large" />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Command</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <IconButton>
                        <InfoOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <CallIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
