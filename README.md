# Picture Perfect

[watch the demo](https://www.youtube.com/watch?v=gySmCPndLuY) or [check out the devpost](https://devpost.com/software/picture-perfect-xqvb34)

## What it does
PicturePerfect is a mobile application that integrates AR (Augmented Reality) technology and queries thousands of other images taken in similar locations in order to determine the best position, angle, and pose for your picture. PicturePerfect uses location data to find images taken near you or at any specified location. If you see an image you like, you can also click on the image to get directed to exactly where it is. Users can look at reference pictures to gain information about the picture settings such as ISO, exposure, etc., and also import these settings into the Live CameraView. Combined with this, PicturePerfect implements an overlay that allows you to merge a reference image with your current surroundings in order to better match an image you want to emulate. 

The second part of our app deals with helping the user position the camera in the best way possible for a picture. The primary hurdle with taking outdoor pictures is lighting, which our app solves by using GPS/Compass information to calculate the position of the Sun. With this information, we display an AR human model to indicate where you should stand to take the best possible picture. Our application also has the ability to take pictures to the camera roll 

Our application uses the position of the Sun combined with the surroundings in our LiveView in order to generate an AR model that predicts the best possible position for you to stand in order to take the perfect picture. It also generates another model that will allow the picture taker to position himself perfectly. All this is done completely automatically, while also allowing for extensive modifications by the user in order to choose their own settings/their picture preferences.
