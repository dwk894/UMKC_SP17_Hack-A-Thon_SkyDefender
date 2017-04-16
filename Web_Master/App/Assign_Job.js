var wastes_1 = [
  ['00', 39.2431787,-94.7370019,'1'],
  ['01', 39.2898592,-94.6863722,'1'],
  ['02', 39.2710242,-94.6678453,'1'],
  ['03', 39.2606268,-94.6623577,'1'],
  ['04', 39.263029,-94.7242035,'1'],
  ['05', 39.2727505,-94.6988655,'1'],
  ['06', 39.2789957,-94.6276975,'1'],
  ['07', 39.2351913,-94.7037787,'1'],
  ['08', 39.2298856,-94.6880157,'1'],
  ['09', 39.2305248,-94.6433863,'1'],
  ['10', 39.2382414,-94.6403928,'1'],
  ['11', 39.240959,-94.6552524,'1'],
  ['12', 39.2190493,-94.6909831,'1'],
  ['13', 39.2189333,-94.6482306,'1'],
  ['14', 39.2911898,-94.8058151,'1'],
];

var wastes_4 = [
  ['45', 39.1990828,-94.8767134,'4'],
  ['46', 39.1491503,-94.8610692,'4'],
  ['47', 39.1006909,-94.8405625,'4'],
  ['48', 39.0785286,-94.8413468,'4'],
  ['49', 39.0358291,-94.7863306,'4'],
  ['50', 39.0411093,-94.7714265,'4'],
  ['51', 39.0377457,-94.762706,'4'],
  ['52', 39.0629461,-94.7348585,'4'],
  ['53', 39.1051807,-94.7177383,'4'],
  ['54', 39.1038394,-94.6711131,'4'],
  ['55', 39.0814747,-94.6713114,'4'],
  ['56', 39.0816183,-94.6528674,'4'],
  ['57', 39.1008603,-94.6423381,'4'],
  ['58', 39.1252578,-94.6217065,'4'],
  ['59', 39.1236686,-94.6212188,'4'],
];

var r_1_d = [];
r_1_d.length = 16;
r_1_d[0] = [0, 1473, 1413, 1423, 1374, 1621, 1479, 1375, 1545, 1416, 1106, 1273, 1193, 1385, 1076, 1884];
r_1_d[1] = [1380, 0, 703, 703, 429, 449, 733, 615, 389, 655, 594, 694, 721, 676, 554, 655];
r_1_d[2] = [1370, 647, 0, 240, 419, 778, 304, 593, 776, 916, 583, 685, 524, 889, 544, 872];
r_1_d[3] = [1131, 408, 477, 0, 360, 556, 544, 399, 479, 620, 344, 445, 284, 593, 305, 819];
r_1_d[4] = [1315, 423, 381, 462, 0, 503, 411, 337, 521, 661, 528, 535, 424, 634, 489, 834];
r_1_d[5] = [1574, 468, 727, 808, 499, 0, 758, 837, 498, 764, 787, 887, 834, 737, 748, 970];
r_1_d[6] = [1433, 725, 270, 351, 411, 770, 0, 705, 768, 908, 647, 748, 587, 881, 607, 983];
r_1_d[7] = [1347, 602, 593, 602, 337, 750, 651, 0, 674, 814, 599, 470, 524, 787, 532, 1013];
r_1_d[8] = [1468, 405, 754, 835, 527, 496, 785, 703, 0, 358, 747, 833, 672, 331, 683, 907];
r_1_d[9] = [1412, 722, 886, 967, 658, 775, 916, 834, 369, 0, 600, 759, 679, 252, 536, 1145];
r_1_d[10] = [1107, 653, 593, 602, 553, 801, 659, 620, 729, 567, 0, 385, 305, 595, 242, 1064];
r_1_d[11] = [1254, 783, 724, 733, 541, 971, 790, 497, 806, 714, 418, 0, 292, 742, 389, 1194];
r_1_d[12] = [1188, 714, 558, 567, 447, 805, 624, 558, 640, 648, 336, 309, 0, 676, 323, 1121];
r_1_d[13] = [1390, 681, 868, 949, 641, 780, 899, 817, 374, 258, 649, 808, 728, 0, 561, 1128];
r_1_d[14] = [1046, 654, 594, 604, 555, 802, 660, 556, 688, 526, 249, 408, 328, 536, 0, 1065];
r_1_d[15] = [1828, 655, 828, 810, 876, 956, 955, 1063, 895, 1144, 1041, 1141, 1126, 1117, 1002, 0];

$(document).ready(
  function() {
    if (sessionStorage.getItem('drivers') === null) {
      sessionStorage.setItem('drivers', 'Ting,Fei,Chen,Yunlong');
    }
    if (sessionStorage.getItem('id') === null) {
      sessionStorage.setItem('id', 'Dayu');
    }
    $('#supervisor').replaceWith('<td id = \'supervisor\' class = \'m_2\'>' + sessionStorage.getItem('id') + '</td>');
    var drivers = sessionStorage.getItem('drivers');
    drivers = drivers.split(',');
    var receivers = '<datalist id = \'job_receiver\'>';
    for (var i = 0; i < drivers.length; i++) {
      receivers += '<option value = "' + drivers[i] + '"></option>';
    }
    receivers += '</datalist>';
    $('#job_receiver').replaceWith(receivers);

    //routine_path('r1');

    var r = routine_path(r_1_d);
    for (var i = 0; i < r.length; i++) {
      if (i === 0) {
        $('#r1').append('&emsp;');
      }
      $('#r1').append(r[i].toString());
      if (i !== r.length - 1) {
        $('#r1').append('&rarr;');
      }
    }
  }
);

var routine_path = function(region) {
  var result = [];
  var color = [];
  color.length = 16;
  for (var i = 0; i < 16; i++) {
    color[i] = 'white';
  }
  var Q = [];
  Q.push(0);
  color[0] = 'black';
  while (Q.length > 0) {
    var T = Q[0];
    Q.pop();
    var dist = Infinity;
    var ind;
    for (var j = 0; j < 16; j++) {
      if (color[j] === 'white' && region[T][j] < dist) {
        dist = region[T][j];
        ind = j;
      }
    }
    if (isFinite(dist)) {
      result.push(ind - 1);
      Q.push(ind);
      color[ind] = 'black';
    }
  }
  return result;
};

$(
  function() {
    $('#assign_job').click(
      function() {
        var job_type = $('#job_t').val();
        if (job_type === 'Routine Job') {
          var reg = $('#region_num').val();
          var receiver = $('#job_r').val();
          var r = routine_path(r_1_d);
          var new_w = [];
          for (var i = 0; i < r.length; i++) {
            new_w.push({
              'waste_id': r[i].toString(),
              'latitude': wastes_1[r[i]][1].toString(),
              'longtitude': wastes_1[r[i]][2].toString(),
              'zone_id': '1'
            });
          }
          $.ajax(
            {
              url: "https://api.mlab.com/api/1/databases/skydefender/collections/sky/" + receiver + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
              data: JSON.stringify(
                {
                  "$set": {
                    "waste_list": new_w
                  }
                }
              ),
              type: "PUT",
              contentType: "application/json",
              success: function(result) {
                alert('Job successfully assigned!');
              },
              error: function(error) {
                alert('Fail');
              }
            }
          );
        }
        else {
          var reg = parseInt($('#region_num').val());
          var receiver = $('#job_r').val();
          var waste_number = parseInt($('#waste_id').val());
          var index = waste_number - 15 * (reg - 1);
          var new_trash = {
            'waste_id': waste_number.toString(),
            'latitude': wastes_4[index][1].toString(),
            'longtitude': wastes_4[index][2].toString(),
            'zone_id': reg.toString()
          };
          $.ajax(
            {
              url: "https://api.mlab.com/api/1/databases/skydefender/collections/sky/" + receiver + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
              method: 'GET',
              success: function(result) {
                var current_waste = result['waste_list'];
                if (current_waste.length < 2) {
                  current_waste.push(new_trash);
                } else {
                  current_waste.push(new_trash);
                  for (var k = current_waste.length - 1; k > 1; k--) {
                    var temp = current_waste[k - 1];
                    current_waste[k - 1] = current_waste[k];
                    current_waste[k] = temp;
                  }
                }
                $.ajax(
                  {
                    url: "https://api.mlab.com/api/1/databases/skydefender/collections/sky/" + receiver + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
                    data: JSON.stringify(
                      {
                        "$set": {
                          "waste_list": current_waste
                        }
                      }
                    ),
                    type: "PUT",
                    contentType: "application/json",
                    success: function(result) {
                      alert('Job successfully assigned!');
                    },
                    error: function(error) {
                      alert('Fail');
                    }
                  }
                );
              },
              error: function(error) {
                alert('Fail');
              }
            }
          );
        }
      }
    );
  }
);

//var routine_path = function(region) {
//  var wastes;
//  switch (region)
//      {
//    case 'r1':
//      wastes = [
//        ['00', 39.2431787,-94.7370019,'1'],
//        ['01', 39.2898592,-94.6863722,'1'],
//        ['02', 39.2710242,-94.6678453,'1'],
//        ['03', 39.2606268,-94.6623577,'1'],
//        ['04', 39.263029,-94.7242035,'1'],
//        ['05', 39.2727505,-94.6988655,'1'],
//        ['06', 39.2789957,-94.6276975,'1'],
//        ['07', 39.2351913,-94.7037787,'1'],
//        ['08', 39.2298856,-94.6880157,'1'],
//        ['09', 39.2305248,-94.6433863,'1'],
//        ['10', 39.2382414,-94.6403928,'1'],
//        ['11', 39.240959,-94.6552524,'1'],
//        ['12', 39.2190493,-94.6909831,'1'],
//        ['13', 39.2189333,-94.6482306,'1'],
//        ['14', 39.2911898,-94.8058151,'1'],
//      ];
//      break;
//    case 'r2':
//      wastes = [
//        ['15', 39.2754468,-94.5993321,'2'],
//        ['16', 39.2845263,-94.5833559,'2'],
//        ['17', 39.2888818,-94.5630145,'2'],
//        ['18', 39.2591714,-94.6400579,'2'],
//        ['19', 39.2675453,-94.6154872,'2'],
//        ['20', 39.265306,-94.5847927,'2'],
//        ['21', 39.2632678,-94.5858203,'2'],
//        ['22', 39.2574029,-94.5882033,'2'],
//        ['23', 39.2518442,-94.586367,'2'],
//        ['24', 39.2517741,-94.5729821,'2'],
//        ['25', 39.2539061,-94.5667222,'2'],
//        ['26', 39.2243489,-94.5813344,'2'],
//        ['27', 39.2247728,-94.5554065,'2'],
//        ['28', 39.2178903,-94.5419984,'2'],
//        ['29', 39.1872093,-94.544712,'2']
//      ];
//      break;
//    case 'r3':
//      wastes = [
//        ['30', 39.1657878,-94.5902334,'3'],
//        ['31', 39.2359789,-94.4959507,'3'],
//        ['32', 39.3543179,-94.4260174,'3'],
//        ['33', 39.3885007,-94.3448454,'3'],
//        ['34', 39.4083557,-94.352175,'3'],
//        ['35', 39.413057,-94.3715472,'3'],
//        ['36', 39.4388803,-94.3393725,'3'],
//        ['37', 39.4194278,-94.3163336,'3'],
//        ['38', 39.3468861,-94.2767125,'3'],
//        ['39', 39.3138709,-94.2923066,'3'],
//        ['40', 39.2723572,-94.3552201,'3'],
//        ['41', 39.265447,-94.3699433,'3'],
//        ['42', 39.2541205,-94.3671224,'3'],
//        ['43', 39.2228467,-94.4076589,'3'],
//        ['44', 39.2149504,-94.3926815,'3'],
//      ];
//      break;
//    case 'r4':
//      wastes = [
//        ['45', 39.1990828,-94.8767134,'4'],
//        ['46', 39.1491503,-94.8610692,'4'],
//        ['47', 39.1006909,-94.8405625,'4'],
//        ['48', 39.0785286,-94.8413468,'4'],
//        ['49', 39.0358291,-94.7863306,'4'],
//        ['50', 39.0411093,-94.7714265,'4'],
//        ['51', 39.0377457,-94.762706,'4'],
//        ['52', 39.0629461,-94.7348585,'4'],
//        ['53', 39.1051807,-94.7177383,'4'],
//        ['54', 39.1038394,-94.6711131,'4'],
//        ['55', 39.0814747,-94.6713114,'4'],
//        ['56', 39.0816183,-94.6528674,'4'],
//        ['57', 39.1008603,-94.6423381,'4'],
//        ['58', 39.1252578,-94.6217065,'4'],
//        ['59', 39.1236686,-94.6212188,'4'],
//      ];
//      break;
//    case 'r5':
//      wastes = [
//        ['60', 39.1000706,-94.5940876,'5'],
//        ['61', 39.1047656,-94.587772,'5'],
//        ['62', 39.1031992,-94.5828907,'5'],
//        ['63', 39.1242372,-94.5906439,'5'],
//        ['64', 39.1120083,-94.5713383,'5'],
//        ['65', 39.1050305,-94.5678021,'5'],
//        ['66', 39.0976358,-94.5747986,'5'],
//        ['67', 39.0814663,-94.5864272,'5'],
//        ['68', 39.0862955,-94.5763322,'5'],
//        ['69', 39.0849556,-94.5762812,'5'],
//        ['70', 39.0627993,-94.5696039,'5'],
//        ['71', 39.0705199,-94.5517173,'5'],
//        ['72', 39.0893246,-94.5422069,'5'],
//        ['73', 39.1091196,-94.5162243,'5'],
//        ['74', 39.0468762,-94.5815972,'5'],
//      ];
//      break;
//    case 'r6':
//      wastes = [
//        ['75', 39.1105869,-94.4711014,'6'],
//        ['76', 39.0886768,-94.4834321,'6'],
//        ['77', 39.0837554,-94.4823369,'6'],
//        ['78', 39.0823413,-94.5173375,'6'],
//        ['79', 39.0599808,-94.5871244,'6'],
//        ['80', 39.0627508,-94.5162774,'6'],
//        ['81', 39.111187,-94.5396423,'6'],
//        ['82', 39.083904,-94.5000264,'6'],
//        ['83', 39.0765059,-94.5137466,'6'],
//        ['84', 39.0554949,-94.4835117,'6'],
//        ['85', 39.0706166,-94.431093,'6'],
//        ['86', 39.0568098,-94.4224853,'6'],
//        ['87', 39.0795022,-94.4186981,'6'],
//        ['88', 39.1032805,-94.4469273,'6'],
//        ['89', 39.0363955,-94.4414704,'6'],
//      ];
//      break;
//    case 'r7':
//      wastes = [
//        ['90', 38.9912292,-94.6836133,'7'],
//        ['91', 38.9750091,-94.7086072,'7'],
//        ['92', 38.977348,-94.7174573,'7'],
//        ['93', 38.8931098,-94.7009274,'7'],
//        ['94', 38.8873278,-94.7020264,'7'],
//        ['95', 38.8846129,-94.700396,'7'],
//        ['96', 38.899684,-94.685969,'7'],
//        ['97', 38.9088063,-94.6453009,'7'],
//        ['98', 38.9062818,-94.6400698,'7'],
//        ['99', 38.9404039,-94.7381737,'7'],
//        ['100', 38.8491518,-94.6570899,'7'],
//        ['101', 39.0015376,-94.5861012,'7'],
//        ['102', 38.9928591,-94.5714563,'7'],
//        ['103', 38.9818346,-94.5682575,'7'],
//        ['104', 38.9656586,-94.6055493,'7'],
//      ];
//      break;
//    case 'r8':
//      wastes = [
//        ['105', 39.0188667,-94.6252613,'8'],
//        ['106', 39.0010317,-94.5814841,'8'],
//        ['107', 38.9866629,-94.5655617,'8'],
//        ['108', 38.9827959,-94.5675494,'8'],
//        ['109', 38.9610732,-94.5917958,'8'],
//        ['110', 38.9431893,-94.4491258,'8'],
//        ['111', 38.9844884,-94.5126759,'8'],
//        ['112', 38.9980997,-94.4805634,'8'],
//        ['113', 38.9836225,-94.492455,'8'],
//        ['114', 39.0148518,-94.4254242,'8'],
//        ['115', 38.9997563,-94.4216776,'8'],
//        ['116', 38.9710594,-94.5574532,'8'],
//        ['117', 38.9745248,-94.5987889,'8'],
//        ['118', 39.0090782,-94.469559,'8'],
//        ['119', 38.981971,-94.5066791,'8'],
//      ];
//      break;
//  }
//  var umkc = '39.1366392,-94.5229319';
//  var query_string = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=';
//  query_string += wastes[14][1].toString() + ',' + wastes[14][2].toString();
//  query_string += '&destinations=' + umkc;
//  for (var j = 0; j < wastes.length; j++) {
//    query_string += '|' + wastes[j][1].toString() + ',' + wastes[j][2].toString();
//  }
//  query_string += '&key=AIzaSyBdQx5oWNym1RUqj57OZsD-nDGyYDUpKSk';
//  $.ajax(
//    {
//      url: query_string,
//      method: 'GET',
//      dataType: 'jsonp',
//      success: function(result) {
//      },
//      error: function(error) {
//      }
//    }
//  );
//};