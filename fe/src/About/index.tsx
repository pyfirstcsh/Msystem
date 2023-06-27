import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider, Layout, List } from "antd";
import "./index.css";
const { Header, Content } = Layout;
// 关于介绍页面
const About = () => {
  const data = [
    "能够折叠导航框，切换不同的导航对应不同的路由。",
    "实现了两个分页器，左下控制全部数据，并通过此向后端请求数据。右下控制查询得到的数据集合。",
    "能够筛选在主导航性别，同时在每一页也有筛选性别功能。",
    "界面较完整，数据集测试信息完整。",
  ];
  const dataBad = [
    "操作菜单未实现dropDown效果，原因是对传入组件信息掌握不熟。",
    "系统logo设计不明显，冗杂在导航栏中。",
    "时间紧迫，对详细信息界面处理不够美观。",
    "整体细节把握不到位。",
  ];
  return (
    <Layout className="site-layout">
      <Header className="header">
        <Breadcrumb
          style={{
            margin: "24px 16px",
          }}
        >
          <Breadcrumb.Item href="#/main/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <UserOutlined />
            <span>简介介绍</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: "12px 8px",
          padding: 24,
          minHeight: 280,
        }}
      >
        <Divider orientation="left">特色亮点</Divider>
        <List
          size="small"
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
        <Divider orientation="left">不足之处</Divider>
        <List
          size="small"
          bordered
          dataSource={dataBad}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Content>
    </Layout>
  );
};

export default About;
