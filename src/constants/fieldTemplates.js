/**
 * 기본 제공 필드 템플릿
 */
export const DEFAULT_FIELD_TEMPLATES = [
    {
        id: 'language',
        name: '어학 정보',
        icon: 'Translate',
        description: 'TOEIC, TOEFL, TEPS 등 어학 점수',
        fields: [
            { fieldType: 'text', fieldName: 'TOEIC 점수' },
            { fieldType: 'text', fieldName: 'TOEFL 점수' },
            { fieldType: 'text', fieldName: 'TEPS 점수' },
            { fieldType: 'text', fieldName: 'OPIC' },
        ]
    },
    {
        id: 'certificate',
        name: '자격증 정보',
        icon: 'WorkspacePremium',
        description: '자격증명, 취득일, 발급기관',
        fields: [
            { fieldType: 'text', fieldName: '자격증명' },
            { fieldType: 'date', fieldName: '취득일' },
            { fieldType: 'text', fieldName: '발급기관' },
        ]
    },
    {
        id: 'techStack',
        name: '기술 스택',
        icon: 'Code',
        description: '프로그래밍 언어, 프레임워크, 도구',
        fields: [
            { fieldType: 'textarea', fieldName: '프로그래밍 언어' },
            { fieldType: 'textarea', fieldName: '프레임워크' },
            { fieldType: 'textarea', fieldName: '개발 도구' },
        ]
    },
    {
        id: 'overseas',
        name: '해외 경험',
        icon: 'Flight',
        description: '해외 체류, 유학, 어학연수 경험',
        fields: [
            { fieldType: 'text', fieldName: '국가명' },
            { fieldType: 'text', fieldName: '체류 기간' },
            { fieldType: 'textarea', fieldName: '활동 내용' },
        ]
    },
];

/**
 * 필드 타입 옵션
 */
export const FIELD_TYPES = [
    { value: 'text', label: '텍스트' },
    { value: 'textarea', label: '텍스트 영역' },
    { value: 'date', label: '날짜' },
    { value: 'dateRange', label: '기간' },
];
