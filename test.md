# Analysis Particles



Rokhaya Ba, Martin Binet*, Jean Mainguy .

## Introduction

The software ImageJ[^1]developed at the National Institutes of Health (NIH), USA, is a Java-based image processing and analysis program. It is available for free, open source, multithreaded and platform independent, with possibilities of developing plugins to suit specific requirements. One of the most prominent feature of the software is the analysis of particles.

Particle analysis consists of measuring different parameters over objects in the image. It is used in many fields for instance to count and measure cells in biology in an automatic and reliable way. Valuable quantitative information may be collected such as number of cells, shape or fluorescence of the cells.  This approach allows to simply compare different population of cells[^3]. 

For a binary or thresholded image it is possible to detect automatically the particles of the image and then count and measure them in an automatic procedure. For gray-levels images the process is more difficult to automate, but it opens access to new methods.

In this paper we focus our attention on the different possible measures that ImageJ provides for binary and grayscale images.

### Particle Detection

Particle detection identifies each particle in the image. It is specific to binary images. In order to detect each particle independently, they should be distinct. In case of two particles touching the program will detect only one particle. This problem can be solved by additional segmentation step such as watershed segmentation. The detection can take into account potential holes in the objects, or ignore it.

### Measurements

#### Mean Gray Value
The mean gray value of a area indicates its global intensity. If the area is a particle, the mean gray value can be compared to other particles gray values, to be able to run statistical tests for example. However, the value is not related to the size of the area. Therefore, two particles with big discrepancies in area can have the exact same mean gray value.

#### Standard Deviation

In ImageJ, this is defined as “Standard deviation of the gray values used to generate the mean gray value”. This means it represents here the amount of variation among the gray values within the area of interest.

#### Integrated Density

The integrated density makes use of the mean gray value seen earlier, but it adds a spatial component. This way, it is possible to differentiate two particles with wildly different areas but very similar mean gray values.

#### Center of Mass

This is the brightness-weighted average of the x and y coordinates of all the pixels in the selection. It represents the center of gravity of the particle or the selection.

#### Area
The area of a particle is the number of pixels in the particle. This number can also be expressed in square unit when the image has been calibrated.  
There are three possibilities to obtain an approximation of the area (Fig. 1) : the net area, the filled area, and the convex area. 

 - The net area is simply the number of pixel of the particle
 - the filled area includes the holes of the particle
 - the convex area refers to the area of the convex hull of the particle.

![area](https://lh3.googleusercontent.com/-_WeXvHWlZ_k/Wdd_6QNKhBI/AAAAAAAAAPo/TqFE7hB2DfkeIdrMyKTn8kH2r3Xh3qfNQCLcBGAs/s0/figure.jpg "figure.jpg")
Fig. 1 : Examples of the results using the three different methods to calculate the area.
 
The chosen approach depends on the image : if it is known that holes correspond to real holes then they should not be included in the area. Otherwise, holes may also be artefacts in the image and in that case should be included. Finally, if it appears that the borders of the particles seem to be distorted, the area of the convex hull may be chosen. 

#### Bounding Rectangle
The bounding rectangle, also known as the minimum bounding box, is the smallest rectangle enclosing the particle[^2]. This rectangle can be oriented or not oriented. In the case of a not oriented rectangle, the rectangle’s sides are parallel to the coordinates axes. ImageJ provides this type of bounding rectangle which is straightforward to determine. It is used to represent, in a general way, the location of the particle in the image. One problem with this type of bounding rectangle is that it is sensitive to object orientation. [^Book] 
#### Shape Descriptors

In many areas, it is necessary to identify similarly shaped objects in an image, or to distinguish between different groups of particles. In order to do this, numerous descriptors for the shape have been conceived, applicable depending on the field of study, the type of particle and the scientific question. 
ImageJ provides four shape descriptors : the circularity, the roundness, the solidity and the aspect ratio.

 - circularity : it describes how close to a circle is the shape of the particle. A value of 1.0 is a perfect circle, while a value close to 0 indicates a more elongated shape. This descriptor might not work on very small particles, where values cannot be interpreted.
 - aspect ratio : it describes the aspect ratio of the fitted ellipse associated to the particle. For instance, an aspect ratio of 2 indicates a major axis twice the length of the minor axis
 - roundness : the roundness is somewhat similar to the circularity, but takes a different approach, as the aspect ratio is also taken into account.
 - solidity : it describes the extent to which a particle shape is convex or concave. The solidity of a completely convex particle is 1. The more the solidity deviates from 1, the more concave is the particle.

Many more descriptors exist depending on the needs : Formfactor, Elongation, Curl, Convexity, Compactness, Modification Ratio, Extent, etc.

Concerning the circularity, while values of circularity range theoretically within the interval $[0, 1]$, the measurement errors of the perimeter may produce circularity values above 1[^4]. The MorpholibJ plugin[^MorphoPlugin] also considers the inverse of the circularity, or elongation index. It’s value can be 1 or higher, 1 referring to round particles and a higher value for elongated particles.

#### Centroid
The centroid is the center point of the selection, regardless of the pixel values. 

#### Perimeter

The perimeter, while simple to obtain for physical objects, can be challenging to calculate on particles in images. One of the main difficulties with perimeter measurement is that it is very magnification-dependant. This issue is similar to the coastal paradox one, which states that the perimeter of the coastline of a landmass depends on the method used. For images, it relies in the fact that higher image magnification reveals more boundary irregularities, and hence a larger value for the perimeter. Noise can also cause flaws in the measurement, causing an overestimation of the perimeter.
There are three types of perimeter measurement :

 - the Total Perimeter. It includes the length of the boundaries around any holes within the particle.
 - the Net Perimeter (or Filled Perimeter). It excludes the internal holes of the particle and focuses exclusively on the external boundaries
 - the Convex Perimeter. It is the length of the convex hull around the periphery of the particle.

When calculating the perimeter, it is crucial to choose the appropriate type depending of what describes best the particle for the problem at hand.


#### Fit Ellipse
In the case of particles, the best fitting ellipse method, as the name suggests, fits an ellipse to the selection. The condition to obtain an ellipse is that it has the same centroid, area and orientation as the particle. It is a method widely used in many fields, for instance to assess the quality of materials in the industry (Fitting an ellipse to an arbitrary shape: implications for strain analysis) or to estimate air pollution due to airborne wood dust particles[^Zhang].

#### Feret's Diameter

The Feret’s diameter[^Feret] ($D_F$) is the longest distance between any two points along the selection boundary, also known as maximum caliper (fig 1).
![enter image description here](https://lh3.googleusercontent.com/-Caz8Ss-TSy0/WdX-8nNODrI/AAAAAAAACIw/aIs2rcx_q5gGqoSVBowHGBCSUF_4iMoygCLcBGAs/s0/diametre+de+feret.png "diametre de feret.png")
fig 1 : Feret's diameter


In case of a rectangle, it represents the diagonal dimension rather than the length.
The Feret's angle (0-180 degrees) is the angle between the Feret's diameter and a line parallel to the x-axis of the image. 
The minimal Feret’s diameter (Min $D_F$) is the minimal Feret’s diameter calculated after considerations of all possible orientations (0 ◦ to 180 ◦ ).
The Feret's diameter indicates the size of the objects. it can be use for the rapid, quantitative and reliable measurement of  relevants biological parameters[^Feret2].



## Material and Methods

### Particle Detection

To analyze particles, ImageJ performs an analysis of connected components, where each of the pixels constituting the objects will be allocated a label. The process starts with the pixel at the top left of the image and continues with the reading pixels line by line, from left to right. As soon as an object pixel is touched,  adjacent pixels (touching pixels backward and upward) are consulted to determine whether they already have a label. If so, this tag is applied to the current pixel. Otherwise, a new label value is assigned to it. In the end, an object is therefore made up of all the pixels carrying the same label.

Two filters are adjustable in order to select the objects to study:

 - Size : in order to select objects whose size is included in the range of size (outside this range, objects will be
ignored)
 - Circularity: in order to select the objects according to their shape (0: not circular, 1: perfect circle). The formula used is the same as described below.

### Mean Gray Value
This is the sum of the gray values of all the pixels in the selection divided by the number of pixels.

### Standard Deviation
The formula used in ImageJ is as follow :
$$\sqrt( \frac{(\sum sqPixVal - \frac{(\sum PixVal)^2}{n})} {(n - 1)} )$$
where $sqPixVal$ is the square pixel value and $PixVal$ is the pixel value.

### Integrated Density
ImageJ provides two values when this field is selected : the Integrated Density (IntDen) and the Raw Integrated Density (RawIntDen). The former is simply the product of the area per the mean gray value, while the former is the sum of all the pixels in the region of interest.

### Center of Mass
The implementation of the center of mass in ImageJ is as follow : 
    

 - first it multiplies each X coordinates with its gray value and sum all of the obtained values
 - then, it multiplies each Y coordinates with its gray value and sum all of the obtained values
 - finally, it divides them by the sum of the masses.

This formula corresponds to the first order of spatial moment.


### Area
### Bounding Rectangle
### Shape Descriptors
The formulas for the circularity, the roundness, the solidity and the aspect ratio are as follow :
$$Circularity = 4\pi\times\frac{Area}{Perimeter^2}$$
$$Roundness = \frac{4\times Area}{\pi\times Maximum Diameter^2}$$
$$Solidity = \frac{Area}{Convex Area}$$
$$Aspect Ratio = \frac{Maximum Diameter}{Minimum Diameter}$$

The formula for the elongation index from the plugin MorphoLibJ is :
$$elongation = \frac{P²}{4\pi \times A}$$

### Centroid
The centroid is calculated by taking the average of the x and y coordinates of all of the pixels in the image or selection : 
$$ x_c = \frac{\sum x_i}{n_p}  \:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:  y_c = \frac{\sum y_i}{n_p}$$
where $(x_c, y_c)$ are the coordinates of the centroid, $x_i$ and $y_i$ are the pixel coordinates and $np$ is the number of pixels.

### Perimeter
The algorithm used by imageJ gives edge pixels a value of 1 and corner pixels a value of $\sqrt{2}$. To do this it calculates the total length of the particle boundary and substracts $2-\sqrt{2}$ for each non-adjacent corner. The formula is as follow :
$$BL - (numNAC\times(2-\sqrt{2} ))$$
where $BL$ = boundary length and $numNAC$ = number of non-adjacent corners.

Other techniques are used, for instance, the Particles8 plugin uses the Freeman chaincode algorithm (http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=5219197).

### Fit Ellipse

There are many algorithms that can be used to obtain a fit ellipse. ImageJ uses the moment(m, n) of the area with the following equation :
$$\int (x^m \times y^n) \times d_x \times d_y$$
where : 

 - $moment(0, 0)$ gives the area
 - $\frac{moment(1, 0)}{area}$ is the x center
 - $\frac{moment(0, 1)}{area}$ is the y center

However, for most particles, this method does not give an ellipse with the exact same area as the particle. To correct the bias, a small correction has to be done by scaling the value on the size of the particle. (https://imagej.nih.gov/ij/developer/source/ (EllipseFitter))

Another algorithm can be found in the plugin DrawEllipse : https://imagej.nih.gov/ij/macros/DrawEllipse.txt

### Feret's Diameter

There are two main algorithms to compute Feret's diameter.

 - The chain code is the most efficient way, it does not rotate the whole object but only the boundary pixels. After the rotation there are two options :
  - Multiplying the coordinates array with the rotation matrix, to obtain the coordinates of the rotated boundary. The difference between the maximum and the minimum coordinates yields the width of the projection.
  - Computating the coordinates array for each rotation, but this time using a rotated version of the direction array. This involves fewer multiplications and is potentially more efficient. (Source).
 
 - Computing Feret's diameter from the convex hull is a more accurate algorithm. We then need to check the diameters for every possible angle. Any of the object’s diameters is equivalent to the corresponding diameter of the object’s convex hull, and any of the object's vertices that are not part of the convex hull are irrelevant for the computation of Feret's diameter. Thus, we can simplify our polygon by computing its convex hull. (Source)

### Benchmark
Benchmark has been process in order to measure the time that takes ImageJ to run each measurement. The image “particles.gif” taken from the samples images of ImageJ has been used to benchmark measures relative to binary image (Particle detection, Area, Bounding Rectangle, Shape Descriptor, Centroid, Perimeter, Fit Ellipse, Feret's Diameter). This is an 8-bit image of 2000x1000 pixels with 5097 particles identified by ImageJ.  A warm-up of 100 iterations was run first, and then the time in milliseconds was measured for 10000 iterations. In ImageJ particle detection corresponds to particle analysis without any parameter checked in the set measurement menu. 

To benchmark the measures specific to grey scale image (Mean Gray Value, Standard Deviation, Center of Mass, Integrated Density, Median), the image “Cell_Colony.jpg” from sample of ImageJ has been used. A warm-up of 1000 iterations was run first, and then the time in milliseconds was measured for 10000 iterations. 
A computer under linux Debian operating system have been used to do the benchmark with a cpu E3-1240 v3, frequency of the cpu of 3.40GHz and with 8 Go of Ram. 


## Results

Figs X and X were obtained after running a benchmark on all methods.

![Result of the benchmark on methods applicable on binary images](https://lh3.googleusercontent.com/-uC1dRZ7cFm8/Wdd4E62UOlI/AAAAAAAAAPE/SQLLzuzHjsEBsEaZqqy-JMA6rjrQJYN9wCLcBGAs/s0/binary.png "binary.png")
fig. X : Time in milliseconds for each methods applicable on binary images.

![Result of the benchmark on methods applicable on gray-level images](https://lh3.googleusercontent.com/-LlspLKf-4bs/Wdd4V5HF0HI/AAAAAAAAAPM/pMCcTt_L-NgrhA9nTw0lZTgURHvn-kKoACLcBGAs/s0/graylevel.png "graylevel.png")
fig. X : Time in milliseconds for each methods applicable on gray-level images.

All methods had a very similar execution time, except the Feret's Diameter and the center of mass.

## Discussion

Concerning the benchmark, we can explain the similarity in time for most of the methods by the fact that the particle detection is first computed. Most of the time is actually taken by the algorithm detecting the particles, and the actual method of interest is much faster. Among the binary methods, the one exception is Feret’s diameter. It is a complex method, rotating every object a number of times to compute the result, and it is not surprising that it would take longer than other methods.
The same reasoning stands true for the center of mass. While the integrated density, mean gray value and standard deviation are fairly simple to compute, the center of mass algorithm is more complex.


## Conclusion

Conclusion : Okay

## References
[^1]:
Schneider CA, Rasband WS, Eliceiri KW. NIH Image to ImageJ: 25 years of image analysis. Nat Methods. 2012 Jul;9(7):671-5

[^2]:
Ferreira T, Rasband W, (2010-2012). ImageJ User Guide. https://imagej.nih.gov/ij/docs/guide/146.html

[^3]:
Jensen EC1,Quantitative analysis of histological staining and fluorescence using ImageJ,Anat Rec (Hoboken). 2013 Mar;296(3):378-81.

[^4]:
Lehmann G and Legland D. "Efficient N-Dimensional surface estimation using Crofton formula and run-length encoding". Insight Journal. 2012; 1-11

[^MorphoPlugin]:
Arganda-Carreras I, Legland D, Mikushin D, et al. (2017, September 9). ijpb/MorphoLibJ: Release v1.3.3. Zenodo. http://doi.org/10.5281/zenodo.888094

[^Book]:
Russ JC. The Image Processing Handbook. 4th ed.  London: CRC Press; 2002

[^Zhang]:
Zhang G, Jayas DS, White NDG. Separation of Touching Grain Kernels in an Image by Ellipse Fitting Algorithm. Biosystems Engineering. 2005; 92(2):135-142

[^Feret]:
Feret LR. “La Grosseur des Grains”. Assoc. Intern. Essais Math. 2D, Zurich. 1931

[^Feret2]:
Briguet A, Courdier-Fruh I, Foster M, et al. Histological parameters for the quantitative assessment of muscular dystrophy in the mdx-mouse. Neuromuscular Disorders. 2004; 14(10):675-682