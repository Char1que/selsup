import React from "react";

interface Param {
  id: number;
  name: string;
  type?: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Color {}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  model: Model;
}

const params: Param[] = [
  { id: 1, name: "Назначение" },
  { id: 2, name: "Длина" },
];

const model: Model = {
  colors: [],
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
};

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getModel = this.getModel.bind(this);
    this.setModel = this.setModel.bind(this);
    this.state = {model};
  }

  public getModel(e: React.FormEvent<HTMLFormElement>): Model {
    e.preventDefault();
    console.log(this.state.model);
    return this.state.model;
  }

  public setModel(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState((prevState: State) => {
      const model = prevState.model;
      const propId: number = e.target.name as unknown as number;
      model.paramValues[propId - 1].value = e.target.value;
      return { model };
    });
  };

  public alertFunction(): void {
    alert('Результат выведен в консоль')
  }

  render() {
    return (
      <form className="editor" onSubmit={this.getModel}>
        {params.map((item: { id: number; name: string }) => (
          <div key={item.id}>
            <div >{item.name}</div>
            <input name={`${item.id}`} autoFocus={true} value={this.state.model.paramValues[item.id - 1].value} onChange={this.setModel}/>
          </div>
        ))}
        <button onClick={this.alertFunction}>
          Получить модель
        </button>
      </form>
    );
  }
}

export default function App () {
  return <ParamEditor model={model} params={params} />;
};
