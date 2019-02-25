##Codec for Strata
###Overview
Strata is a scalable code to transfer exclusive info for different distance, and publishes a [paper](https://www.eng.yale.edu/wenjun/papers/strata.pdf) on ACM MobiCom'14. 

###Requirement for Tool
On the research the potential scheme for our code design, designers need a tool to generate image to test our algorithm and analysis the result we get, including the error rate and the precise illustration for mistake. Besides, we also need offline error correction interface to help us decide which error correction algorithm is best for the code.

Detailed Requirements

- Interfaces for encoding/decoding/error correction algorithm
- Image generating for special test
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

This algorithm mainly use the mind to control the major color of the block to decide the information. If you have more interest, free to check the paper.

####The encoding interface
<img src="/assets/content/blogs/strata/01_o.jpg" width="50%" height="50%" style="margin:auto"/><img src="/assets/content/blogs/strata/02_o.jpg"  style="margin:auto"/><img src="/assets/content/blogs/strata/2_o.jpg" width="50%" height="50%" style="margin:auto"/>

For different test requirements, this tool could generate images for special test, including images for exposure test, images for extrem test, etc.

####The decoding intreface
#####Advancement for correcting info
<img src="/assets/content/blogs/strata/01.jpg" width="50%" height="50%" style="margin:auto"/>

The major two equipments to correct the mistakes are the division algorithm in gray value and the error correction algorithms. This tool supports interfaces to embed these two parts. And we mainly use the Reed Solomon as our error correction algorithm.

#####Data Analysis
This tool generates different data for post-process in matlab, including error rates based on layers, error rates for different algorithms, gray value distribution, etc.

<img src="/assets/content/blogs/strata/wrong.jpg" width="50%" height="50%" style="margin:auto"/>

In addition, the detailed errors appearing in the origin image will illustrated, which could assist researchers easily identify the problems of the alogrithm.
