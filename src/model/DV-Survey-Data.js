export const DV_Survey = [
  {
    surveyData: {
      questions: [
        {
          question: 'Emotional valence (1-negative and 5-Positive)',
          responses: [
            { value: 1, text: 'Very Negative' },
            { value: 2, text: 'Negative' },
            { value: 3, text: 'Neutral' },
            { value: 4, text: 'Positive' },
            { value: 5, text: 'Very Positive' },
          ],
          id: 'Emotion'
        },
        {
          question: 'Arousal (1-Low, 5-high)',
          responses: [
            { value: 1, text: 'Not Excited at all' },
            { value: 2, text: 'Little Excited' },
            { value: 3, text: 'Neutral' },
            { value: 4, text: 'Excited' },
            { value: 5, text: 'Very Excited' },
          ],
          id: 'Arousal'
        },
        {
          question:
            'How much do you agree with the information presented in the video?',
          responses: [
            { value: 1, text: 'Strongly agree' },
            { value: 2, text: 'Agree' },
            { value: 3, text: 'Neutral' },
            { value: 4, text: 'Little agree' },
            { value: 5, text: 'Not at all agree' },
          ],
          id: 'Agreement'
        },
        {
          question:
            'How trustworthy is the information presented in the video?',
          responses: [
            { value: 1, text: 'Very Trustworthy' },
            { value: 2, text: 'Trustworthy' },
            { value: 3, text: 'Neutral' },
            { value: 4, text: 'Little Trustworthy' },
            { value: 5, text: 'Not Trustworthy at all' },
          ],
          id: 'Trustworthiness'
        },
        {
          question: 'How credible is the information presented in the video?',
          responses: [
            { value: 1, text: 'Very Credible' },
            { value: 2, text: 'Credible' },
            { value: 3, text: 'Neutral' },
            { value: 4, text: 'Little Credible' },
            { value: 5, text: 'Not credible at all' },
          ],
          id: 'Credibility'
        },
      ],
    },
    surveyType: 'DV_SURVEY',
  },
];
