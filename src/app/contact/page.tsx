const primaryContacts = [
  {
    label: "邮箱",
    value: "hktest@tesight.com",
    href: "mailto:hktest@tesight.com",
  },
  {
    label: "服务热线",
    value: "400-999-3848",
    href: "tel:4009993848",
  },
  {
    label: "官网",
    value: "www.tesight.com",
    href: "https://www.tesight.com/",
  },
];

const offices = [
  {
    city: "广州",
    address: "广东省广州市黄埔区开泰大道 30 号佳都 PCI 科技园 6 号楼 1-7 层",
    tel: "020-3874 3032",
  },
  {
    city: "上海",
    address: "上海市闵行区紫星路 588 号 2 幢 703 室",
    tel: "021-6728 3710",
  },
  {
    city: "苏州",
    address: "江苏省苏州市工业园区月亮湾路 15 号中新大厦 2904 室",
    tel: "0512-6145 2036",
  },
  {
    city: "北京",
    address: "北京市海淀区中关村东升科技园北街 6 号院 10 号楼 717 室",
    tel: "010-5781 5068",
  },
  {
    city: "西安",
    address: "陕西省西安市唐延路 15 号天一国际大厦 9 层 910 房",
    tel: "029-8187 3816",
  },
  {
    city: "成都",
    address: "四川省成都市高新区吉瑞二路 188 号高新创合中心 A 座 8 层 805-806",
    tel: "028-6391 0020",
  },
];

const regionalOffices = [
  {
    city: "中国台湾",
    address: "中国台湾台北市中山区敬业一路 99 号 3 楼（大湾科技中心大楼）",
    tel: "+886-2-8501 5332",
  },
  {
    city: "中国香港",
    address: "中国香港将军澳工业区骏昌街 5 号数据技术中心 1107-1108",
    tel: "+852-3175 7377",
  },
  {
    city: "韩国",
    address:
      "韩国首尔特别市江东区高德商务谷路 26 号（高德洞，江东 U1 中心）B 栋 1013 室",
    tel: "",
  },
  {
    city: "日本",
    address: "日本分部",
    tel: "",
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto max-w-6xl text-left">
          <h1 className="m-0 max-w-4xl text-7xl font-bold leading-[1.2] tracking-tighter text-foreground">
            联系
          </h1>
          <p className="mt-5 max-w-3xl text-2xl leading-[1.2] tracking-tight text-foreground-2">
            如需测试测量方案咨询、产品选型或技术支持，可以通过以下方式联系德思特科技
          </p>
        </div>
      </section>

      <section className="pb-30 pt-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {primaryContacts.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="block rounded-sm bg-background-2 p-6 text-foreground no-underline hover:opacity-80"
              >
                <div className="text-sm font-bold text-foreground-2">
                  {item.label}
                </div>
                <div className="mt-2 text-2xl font-medium leading-[1.2]">
                  {item.value}
                </div>
              </a>
            ))}
          </div>

          <section className="mt-16">
            <h2 className="m-0 text-4xl font-normal leading-[1.2] text-foreground">
              国内分部
            </h2>
            <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {offices.map((office) => (
                <article key={office.city}>
                  <h3 className="m-0 text-2xl font-medium leading-[1.2] text-foreground">
                    {office.city}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-foreground-2">
                    {office.address}
                  </p>
                  <p className="mt-2 text-base font-medium leading-7 text-foreground">
                    Tel：{office.tel}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-20 ">
            <h2 className="m-0 text-4xl font-normal leading-[1.2] text-foreground">
              地区与海外分部
            </h2>
            <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2">
              {regionalOffices.map((office) => (
                <article key={office.city}>
                  <h3 className="m-0 text-2xl font-medium leading-[1.2] text-foreground">
                    {office.city}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-foreground-2">
                    {office.address}
                  </p>
                  {office.tel && (
                    <p className="mt-2 text-base font-medium leading-7 text-foreground">
                      Tel：{office.tel}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
