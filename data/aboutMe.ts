interface StyleProps {
  colorMode: string;
}

const style = (props: StyleProps) =>
  `color: var(--chakra-colors-brand-${
    props.colorMode === 'light' ? '600' : '300'
  });font-weight: 500;`;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const info = (props: any): { input: string; return: string }[] => [
  {
    input: 'self.learnAboutMe()',
    return: 'Loaded data...',
  },
  {
    input: 'self.currentLocation',
    return: '"Bhavesh Mahajan, Nagpur"',
  },

  {
    input: 'self.interests',
    return: '["Travelling", "Games", "Playing Guitar"]',
  },
  {
    input: 'self.education',
    return: '"B.Tech - SVPCET Nagpur([...Persuing])"',
  },
  {
    input: 'self.skills',
    return:
      '[  "ReactJs", "NextJS", "Framer-Motion", "NodeJs", "git","JavaScript", "HTML","CSS","MYSQL"]',
  },
  {
    input: 'self.contactMe()',
    return: `["<a style="${style(
      props
    )}" rel="noopener" href="https://www.linkedin.com/in/bhavesh-mahajan-b4255922b/">LinkedIn</a>", "<a style="${style(
      props
    )}" rel="noopener" href="https://github.com/bhavesh149">Github</a>", "<a rel="noopener" style="${style(
      props
    )}" href="mailto:mahajanbhaveshop2@gmail.com">Email</a>"]`,
  },
];

export default info;
