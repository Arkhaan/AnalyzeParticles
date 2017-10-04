function run_AnalyzeP(parametre, nombre, imp) {
    IJ.run("Set Measurements...", parametre + " redirect=None decimal=3");
    result = new Array();
    var i;
    var total = 0;
    for (i = 0; i < nombre; i++) {
        var start = new Date();
        var start_time = start.getTime();
       
        IJ.run(imp, "Analyze Particles...", " ");
        
        var end = new Date();
        var end_time = end.getTime();
        var time = end_time - start_time;
// 	result.push(time);
	total = total + time; 
	
    }
    
    
    result.sort(function(a, b){return a - b});
   
    var median = result[Math.round(nombre/2)];
    IJ.log(parametre+","+total/nombre+","+median);
    IJ.deleteRows(0,0);
    IJ.saveAs("Text", "/net/cremi/jmainguy/M2/structural_biology/AnalyseParticle/benchmark/"+parametre+".txt");
//     return total/nombre;
}


var setM = new Array("area", "mean", "standard", "modal", "min", "centroid", "center", "perimeter", "bounding", "fit", "shape", "feret's", "integrated", "skewness", "area_fraction");

imp = IJ.openImage("http://wsr.imagej.net/images/particles.gif");

var i;
var nb = 10;
for (i = 0; i < setM.length; i++) {
    run_AnalyzeP(setM[i], nb, imp);
//     IJ.log(setM[i]);
//     IJ.log(result)  ;
}

