import Post from "./Post";
import Challanges from "../Challanges";
import GameCollection from "../GameCollection";
import Wishlist from "../Wishlist";
import PhotosCollection from "../PhotosCollection";
import ProfileSettings from "./ProfileSettings";
import ProfileEdit from "./ProfileEdit";

export default function ProfileContainer({profileView}){
    switch(profileView){
        case 'posts':
            return <Post/>;
        case 'photos':
            return <PhotosCollection/>
        case 'challanges':
            return <Challanges/>
        case 'collection':
            return <GameCollection/>
        case 'wishlist':
            return <Wishlist/>
        case 'settings':
            return <ProfileSettings/>
        case 'edit':
            return <ProfileEdit/>
        default:
            return <Post/>

    }
    
}

