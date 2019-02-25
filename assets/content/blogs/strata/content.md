##Codec for Strata
###Overview
Strata is a scalable code to transfer exclusive info for different distances and publishes a [paper](https://www.eng.yale.edu/wenjun/papers/strata.pdf) on ACM MobiCom'14. 

###Requirement for Tool
On the research the possible scheme for our code design, designers need a tool to generate images to test our algorithm and analysis the result we get, including the error rate and the precise illustration for mistakes. Besides, we also need an offline error correction interface to help us decide which error correction algorithm is best for the code.

Detailed Requirements

- Interfaces for encoding/decoding/error correction algorithm
- The image generating for special test
- Good analysis for results

###Architecture
```mermaid
graph LR;
    
    Tool[Codec for Strata]-->Encoding;
    Tool-->Decoding;
    Encoding-->encodeInterface[Encode algorithm interface]
    Encoding-->encodeImage[Conversion from bytes to image]
    Decoding-->decodeColorAnaylise[Spectrum analysis]
    Decoding-->decodeInterface[Decode algorithm interface]
    Decoding-->decodeErrorCorrection[Decode error correction interface]
    Decoding-->decodeResultAnalysis[Analysis for result]
    decodeResultAnalysis-->illustration[Mistake illustration in images]
    decodeResultAnalysis-->data1[The gray value]
    decodeResultAnalysis-->data2[The statiscs of correction and mistake]
```

###Demonstration
####The code algorithm
<img src="/assets/content/blogs/strata/cover1.png"  style="margin:auto"/>

This algorithm mainly uses the mind to control the primary color of the block to decide the information, and if you have more interest, free to check the paper.

####The encoding interface
<img src="/assets/content/blogs/strata/01_o.jpg" width="50%" height="50%" style="margin:auto"/><img src="/assets/content/blogs/strata/02_o.jpg"  style="margin:auto"/><img src="/assets/content/blogs/strata/2_o.jpg" width="50%" height="50%" style="margin:auto"/>

For different test requirements, this tool could generate images for particular tests, including pictures for exposure test, images for extreme test, etc.

####The decoding intreface
#####Advancement for correcting info
<img src="/assets/content/blogs/strata/01.jpg" width="50%" height="50%" style="margin:auto"/>

The primary two methods to correct the mistakes are the division algorithm in gray value and the error correction algorithms. This tool supports interfaces to embed these two parts. And we mainly use the Reed Solomon as our error correction algorithm.

#####Data Analysis
This tool generates different data for post-process in Matlab, including error rates based on layers, error rates for different algorithms, gray value distribution, etc.

<img src="/assets/content/blogs/strata/wrong.jpg" width="50%" height="50%" style="margin:auto"/>

Also, the detailed errors appearing in the original image will be illustrated, which could assist researchers quickly identify the problems of the algorithm.
