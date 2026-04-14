export class ValidationLocalization {
    static get REQUIRED(): string { return $localize`:@@share.validation.required:This field is required.`; }
    static get MAX_LENGTH(): string { return $localize`:@@share.validation.max-length:This field's value is too long.`; }
    static get FILE_FORMAT(): string { return $localize`:@@share.validation.file-format:Invalid file format.`; }
    static get FILE_MAX_SIZE_PART_1(): string { return $localize`:@@share.validation.file-max-size-part-1:Max allowed size`; }
    static get FILE_MAX_SIZE_PART_2(): string { return $localize`:@@share.validation.file-max-size-part-2:your file size is`; }
    static get EMPTY(): string { return $localize`:@@share.validation.empty:Should not be empty.`; }
    static get DUPLICATE(): string { return $localize`:@@share.validation.duplicate:Duplicate value.`; }
    static get TAG_LENGTH(): string { return $localize`:@@share.validation.tag.length:Tag value is too long, allowed length`; }
    static get TAGS_LENGTH(): string { return $localize`:@@share.validation.tags.length:Too much tags.`; }
    static get FROM_LESS_TO(): string { return $localize`:@@share.validation.from-less-to:From value must be less than To value.`; }
    static get TO_MORE_FROM(): string { return $localize`:@@share.validation.to-more-from:To value must be more than From value.`; }
    static get VALIDATION_ERROR(): string { return $localize`:@@share.validation.error:Could not perform validation.`; }
    static get EQUAL(): string { return $localize`:@@share.validation.equal:Must be equal.`; }
    static get NOT_EQUAL(): string { return $localize`:@@share.validation.not-equal:Must be not equal.`; }
    static get MIN_PART_1(): string { return $localize`:@@share.validation.min:Minimum allowed value is `; }
    static get MAX_PART_1(): string { return $localize`:@@share.validation.min:Maximum allowed value is `; }
}