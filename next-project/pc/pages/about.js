import Layout from '../components/Layout';
import PagerContainer from '../components/PaperContainer';
import DynamicUnderline from '../components/DynamicUnderline';

export default () => (
  <Layout>
    <div className="container">
      <PagerContainer>
        <p>大家好，我叫 rbackrock 网名也取过回滚滚、逆十方</p><br/>
        <p>喜欢计算机，愿望之一是可以撸代码撸到老</p><br/>
        <p>有人说，优秀的程序员，同时也是一名优秀的作家。希望以这亲手打造的博客为契机，开始记录技术和生活的点滴</p><br/>
        <p>如果你喜欢本博客，欢迎使用和 Fork 项目，源代码<a className='link' target="_black" href="https://github.com/rbackrock/rblog">点这里</a></p><br/>
        <p>电邮：cokekokotea#gmail.com</p><br/>
        <p>感谢你的访问<DynamicUnderline /></p><br/>
      </PagerContainer>
    </div>

    <style jsx>{`
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 95%;
      }

      .link {
        color: #b4a08e;
        text-decoration: none;
      }

      .link:hover {
        color: #645647;
      }
    `}</style>
  </Layout>
);
