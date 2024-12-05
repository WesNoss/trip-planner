// app/page.tsx

import InputForm from "./components/input-form/input-form";
import style from "./page.module.css";

export default function Home() {


  return (
    <div className={style.page}>
      <main className={style.main}>
        <div className={style.title}>Page Title</div>
        <InputForm/>
      </main>
    </div>
  );
}
