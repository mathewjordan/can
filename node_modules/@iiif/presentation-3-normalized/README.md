# IIIF Presentation 3 types (Normalized)

A set of types that describe an opinionated normalized format of the IIIF Presentation 3.0 specification.

Installation:

```
$ npm i @iiif/presentation-3-normalized
```

Installation (yarn):

```
$ yarn add @iiif/presentation-3-normalized
```

#### Normalized resources

This is map of all the resources normalized where the following modifications are assumed to have been made:

- Everything property exists either as null, or an empty array
- Nested resources are replaced with references (id/type)
- References that _could_ have a selector are mapped to `SpecificResource`

The [@iiif/parser](https://github.com/IIIF-Commons/parser) library is an implementation of this normalization
specification, although they are free to be used standalone.

| Type                               | Description                                            |
|------------------------------------|--------------------------------------------------------|
| **DescriptiveNormalized**          | Normalized abstract with all descriptive properties    |
| **LinkingNormalized**              | Normalized abstract with all linking properties        |
| **StructuralNormalized**           | Normalized abstract with all structural properties     |
| **OtherPropertiesNormalized**      | Misc properties on W3C Annotations normalized          |
| **AnnotationW3cNormalised**        | Normalized W3C Annotation                              |
| **AnnotationCollectionNormalized** | Normalized Annotation Collection                       |
| **AnnotationNormalized**           | Normalized Annotation as it appears in a IIIF Manifest |
| **AnnotationPageNormalized**       | Normalized Annotation Page                             |
| **CanvasNormalized**               | Normalized Canvas                                      |
| **CollectionNormalized**           | Normalized Collection                                  |
| **CreatorNormalized**              | Normalized Creator (from annotation)                   |
| **ManifestNormalized**             | Normalized Manifest                                    |
| **RangeNormalized**                | Normalized Range                                       |
| **ServiceNormalized**              | Alias of Service - NOT CURRENTLY SUPPORTED             |
| **ContentResourceNormalized**      | Alias of ContentResource - NOT CURRENTLY SUPPORTED     |
