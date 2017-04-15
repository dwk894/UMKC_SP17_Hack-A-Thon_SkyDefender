function CurrentNearestPlace(CurrentLocation, PlacesList[])     
{
//find nearest places in new node list.
  Place NearestNewPlace =new Place();
  var minDistance;
  for(var i=0; i<PlacesList.size();i++)
    {
      if(Distance(CurrentLocation, PlacesList[i])<minDistance)
        {
          NearestNewPlace = PlacesList[i];
        }
    }
  return NearestNewPlace;
}