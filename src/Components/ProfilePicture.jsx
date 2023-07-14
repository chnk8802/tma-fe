import Image from 'react-bootstrap/Image';

function ProfilePicture({ imageDimension, imageSource, thumbnail }) {
  return (
    <div className="p-0">
      <Image src={imageSource} roundedCircle style={imageDimension} thumbnail={thumbnail ? true : false} />
    </div>
  );
}

export default ProfilePicture;