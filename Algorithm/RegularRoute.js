function RegularRoute(source, destination, zone, M[][], ListOfWaste[]) 
{
  var Route=Place[];
  Route[0]=source;
  var current=0;
  source.color="black";
  for(var i=(zone-1)*15;i<zone*15;i++)
    {
      current++;
      ListOfWaste[NearestNode(Route[current],M[][],ListOfWaste)].color=black;
      Route[current]=ListOfWaste[NearestNode(Route[current],M[][],ListOfWaste)];
    }
  Route[16]=destination;
}
  




 
//  var Route=Place[];
//  Route[0]=source;
//  var current=0;
//  var Min=M[now][now.zone+1];
//  var nearest;
//  for(var k=0;k<15;k++)
//    {
//      for(var i=(zone-1)*15;i<zone*15;i++)
//      {
//          if(Matrix[Route[current].id][i]<Min)
//          {
//            for(var j=0;j<=current;j++)
//              {
//                if(Route[j].id==i)
//                  {
//                    break;
//                  }
//                else
//                {
//                  Min=Matrix[now][i];
//                  nearest=i;
//                }
//              }
//          }
//      }
//      Route[current]= ListOfWaste[nearest];
//      current++;
//    }
//  Route[16]=destination;

