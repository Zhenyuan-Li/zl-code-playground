export const defaultCells = [
  {
    content:
      "# zl-jspg (Zhenyuan Li's JavaScript Playground)\nThis is an interactive coding environment. You can write JavaScript, see it executed, and write comprehensive documentation using markdown.\n- Click any text cell (including this one) to edit it.\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer it in any following cell !\n- You can show any React component, string, number or anything else by calling `show` function. This is a function built into this environment. \n- Call `show` multiple times to show multiple values.\n- Re-order or delete cells using the buttons on the top right\n- Add new cells by hovering on the divider between each cell.\n All of your changes get saved to the file you opened JBook with. </br> \n Below is an example of showing a simple react component ",
    type: 'text',
    id: 'jvp',
  },
  {
    content:
      "import {useState} from 'react';\n\nconst App = () => {\n  const [color, setColor] = useState('#00b4d8');\n  const simpleStyle = {color, 'font-family': 'Helvetica, sans-serif'}\n\n  const changeColorHandler = () => {\n    setColor((prevState) => (prevState === '#00b4d8' ? '#d62828' : '#00b4d8'))\n  }\n\n  return (<div>\n  <h2 style={simpleStyle}>Hello World</h2>\n  <button onClick={changeColorHandler}>Change Title Color</button>\n  </div>)\n};\n\nshow(<App/>)",
    type: 'code',
    id: 'ygr',
  },
];

export const errorCells = (errorMsg: string, newFilename: string) => [
  {
    content: `# ${errorMsg} \n - We create a new file named ${newFilename} on the current directory.\n - Hover below to create a new cell and start the journey!\n - ps: this text cell is also editable `,
    type: 'text',
    id: '3y0',
  },
];
