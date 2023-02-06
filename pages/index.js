import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
import wife from '../assets/wife.jpeg'
import boss from '../assets/boss.jpeg'
import elderly_person from '../assets/elderly_person.jpeg'
import cat from '../assets/cat.jpeg'
import dog from '../assets/dog.jpeg'
import children from '../assets/children.jpeg'
import husband from '../assets/husband.jpeg'
import darth_vader from '../assets/darth_vader.jpeg'
import ReactLoading from "react-loading";

const Home = () => {
  // ユーザーの入力値
  const [userInput, setUserInput] = useState('');
  // 対象選択
  const [target, setTarget] = useState('');
  // apiの出力
  const [apiOutput, setApiOutput] = useState('')
  // 出力中かどうか
  const [isGenerating, setIsGenerating] = useState(false)


  const img = ""

  /**
   * ユーザーの入力値変化チェック
   * @param {*} event 
   */
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  /**
   * 対象選択
   * @param {*} e 
   */
  const onSelect = (e) => {
    const val = e.currentTarget.getAttribute('data-val')
    setTarget(val)
    console.log(val)
  };

  /**
   * 対象が選ばれているかどうか
   * @param {*} val 
   * @returns 
   */
  const isActiveTarget = (val) => {
    if(val == target){
      console.log(val)
      
      return true
    }
    return false
  }

  /**
   * 対象リスト
   */
  const targetList = [
    { name:"wife", url:wife},
    { name:"husband", url:husband},
    { name:"elderly person", url:elderly_person},
    { name:"children", url:children},
    { name:"boss", url:boss},
    { name:"dog", url:dog},
    { name:"cat", url:cat},
    { name:"darth vader", url:darth_vader},
  ]

  /**
   * 望ましい解決方法
   */
  const hopeList = [
    "reconciliation",
    "escape",
    "defeat"
  ]


  /**
   * 問題を解決します。
   */
  const solving = async () => {

    if(!target) {
      setTarget("other")
    }
    if(!userInput) {
      alert("Enter the problem you are having.")
      return
    }

    let input = userInput + " " + atouchComment()

    setIsGenerating(true);
 
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  /**
   * targetに応じて解決方法の指針を設定します。
   */
  const atouchComment = () => {
    let res = `Since the person to whom this question is addressed is ${target}, can you give me an answer that fits this person?`
    switch(target){
      case "wife":
        res += 'Use compliments such as "pretty" and "beautiful."'
        break;
      case "husband":
        res += "Husbands (or men) are stupid and should be fished out with a good meal."
        break;
      case "elderly person":
        res += "Tell your elderly people to be kind. And don't forget to encourage them to pass on their plentiful savings to the next generation."
       break;
      case "children":
        res += "Please use a harsh tone so that people understand that the world is tough."
        break;
      case "boss":
        res += "Anyway, tell them to be flirtatious. You can be arrogant if you get a new job."
        break;
      case "dog":
        res += "Throwing the ball will solve the problem."
        break;
      case "cat":
        res += "Encourage them to give matatabi."
        break;
      case "darth vader":
        res = "Convince them to give up solving the problem. Tell them to run away as hard as they can. And finally, Please add the sentence 'my condolences' at the end of your answer."
        break;
      default:
        res = "Please let me know how to solve this problem."
        break;
    }
    return res
  }

  // if (isGenerating) {
  //   return (
  //     <section className="flex justify-center items-center loading-screen">
  //       <div>
  //         <ReactLoading
  //           type="spin"
  //           color="#fff"
  //           height="100%"
  //           width="100%"
  //           className="mx-auto"
  //         />
  //         <p className="text-center mt-3">loading</p>
  //       </div>
  //     </section>
  //   );
  // } else {
    return (
      <div className="root">
        <Head>
          <title>GPT-3 Writer | buildspace</title>
        </Head>
        <div className="container">
          <div className="header">
            <div className="header-title">
              <h1>Solving your problems</h1>
            </div>
            <div className="header-subtitle">
              <h2></h2>
              <p><strong>Disclaimer clause.</strong> I am an apprentice, so I cannot be held responsible.</p>
            </div>
            
            <div className="prompt-container">
              <div className="img-cont">
                <h5>Who are the people who are bothering you?<br></br> If the subject does not exist, proceed without selecting it</h5>
                <div className='center'>
                {targetList.map((data) => {
                  return (
                    <div key={data.name} className={
                      isActiveTarget(data.name) ? 'target-area selected' : 'target-area'
                    }>
                      <Image 
                      className='target-img' src={data.url} 
                      data-val={data.name} onClick={onSelect}
                      alt={data.name} />
                      <p className='target-title'>{data.name}</p>
                    </div>
                  );
                })}
                </div>
              </div>
              <textarea 
                placeholder="Please enter the problem you are having." 
                className="prompt-box" 
                value={userInput}
                onChange={onUserChangedText}/>
                <div className="prompt-buttons">
                  <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
                    onClick={solving}>
                    <div className="generate">
                    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                    </div>
                  </a>
                </div>
            </div>
          </div>
        </div>
        <div className="badge-container grow">
          <a
            href="https://buildspace.so/builds/ai-writer"
            target="_blank"
            rel="noreferrer"
          >
            <div className="badge">
              <Image src={buildspaceLogo} alt="buildspace logo" />
              <p>build with buildspace</p>
            </div>
          </a>
        </div>
        {/* New code I added here */}
        {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
      </div>
    )
  //};
};

export default Home;
