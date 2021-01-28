import React from 'react'
import "./ChatHeader.css"
import { IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import HelpIcon from '@material-ui/icons/Help';

function ChatHeader({ channelName }) {

    return (
        <div className="chatHeader">
            <div className="chatHeader__left">
                <h3><span className="chatHeader__hash">#</span>{channelName}</h3>
            </div>
            <div className="chatHeader__right">
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <IconButton>
                    <EditLocationIcon />
                </IconButton>
                <IconButton>
                    <PeopleAltIcon />
                </IconButton>
                <div className="chatHeader__search">
                    <input type="text" placeholder="Search" />
                    <SearchIcon />
                </div>
                <IconButton>
                    <SendIcon />
                </IconButton>
                <IconButton>
                    <HelpIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default ChatHeader
