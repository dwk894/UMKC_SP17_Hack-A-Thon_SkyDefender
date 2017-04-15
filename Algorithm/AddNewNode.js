function AddNewNode(M[][], ListOfWaste[], NewNodes[])
{
//find waste places in 2 hours
  Place EmergencyList = new Place[];              
  var NumberofEmergency=0;
  for(var i=0;i<NewNodes[].size();i++)
    {
      if(0<NewNodes[i].time<120)
        {
          EmergencyList[NumberofEmergency]=NewNodes[i];
          NumberofEmergency++;
        }
    }
  var Avelatitude=0;
  var Avelongtitude=0;
  
//find the center of those emergency places
  if(NumberOfEmergency>=3)                        
    {
      Sumlatitude=0;
      Sumlongtitude=0;
      for(var j=0;j<NumberofEmergency;j++)
        {
          Sumlatitude+=EmergencyList[j].latitude;
          Sumlongtitude+=EmergencyList[j].longtitude;
        }
      Avelatitude=Sumlatitude/NumberofEmergency;
      Avelongtitude=Sumlatitude/NumberofEmergency;
    }
  Place centerPoint = new Place(-1,Avelatitude,Avelongtitude,-1,-1,"white");
  
//find concentrated emergency places
  Place ConcentratedEmergency = Place[];                 
  for(var k=0;k<NumberofEmergency;k++)
    {
      if(Distance(centerPoint,EmergencyList[k])<30)
      {
        ConcentratedEmergency.push(EmergencyList[k]);
      }
    }
  
  //Generate new route
  Place NewRoute= new Place[];
  for(var i=0;i<ConcentratedEmergency.size();i++)
    {
      NewRoute.push(CurrentNearestPlace(Currentlocation,ConcentratedEmergency[]));
      CurrentNearestPlace(Currentlocation,ConcentratedEmergency[]).color="black";
    }
  for(var j=0;j<EmergencyList.size();j++)
    {
      if(EmergencyList[j].color=="white")
        {
          CurrentNearestPlace(Currentlocation,ConcentratedEmergency[]);
          CurrentNearestPlace(Currentlocation,ConcentratedEmergency[]).color="black";
        }
    }
  
  for(var k=0;k<NewNodes.size();k++)
    {
      if(NewNodes.color=="black")
        {
          continue;
        }
      else if(NewNodes.timelimited!=-1)
        {
          NewRoute.push(CurrentNearestPlace(NewRoute[NewRoute.size()-1],ListOfWaste()));
        }
      else
        {
          ListOfWaste.push(NewNodes[k]);
        }
    }
  
  while(!ListOfWaste().empty)
    {
        NewRoute.push(CurrentNearestPlace(NewRoute[NewRoute.size()-1],ListOfWaste()));
      
    }

//  for(var k=0;k<NewNodes.size();k++)
//    {
//      if(NewNodes.color=="black")
//        {
//          continue;
//        }
//      else
//      {
//        var MiniNode=0;
//        var MiniDistance =Distance(NewNodes,ListOfWaste[0]);
//        for(var i=1;i<ListOfWaste.size();i++)
//          {
//            if(Distance(NewNodes,ListOfWaste[i])<MiniDistance)
//              {
//                MiniDistance=Distance(NewNodes,ListOfWaste[i]);
//                MiniNode=i;
//              }
//          }
//        CurrentNearestPlace()
//      }
//    }
}