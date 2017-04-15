function NearestNode(now, M[][], ListOfWaste[]) 
{
  now.color=black;
  var Min=M[now.id][now.id+1]
  var nearest;
  for(var i=now.id;i<now.id+15;i++)
  {
    if(ListOfWaste[i].color=="black")
      continue;
    else
      {
      if(Matrix[now.id][i]<Min)
      {
        Min=Matrix[now.id][i];
        nearest=i;
      }
    }
  }
  return nearest;
}