import { Icon } from "@iconify/react";

const projectLinks = [
  {
    href: "https://www.tesight.com/gb-t-45086-1-2024-solution/",
    label: "车载定位系统 GB/T 45086 自动化测试方案",
  },
  {
    href: "https://www.tesight.com/automotive-driving-hil-solution/",
    label: "用于自动驾驶 HiL 应用的 GNSS 仿真解决方案",
  },
  {
    href: "https://www.tesight.com/awg-drive-aom-aod/",
    label: "AWG 驱动 AOM/AOD 综合解决方案",
  },
  {
    href: "https://www.tesight.com/agv/",
    label: "工业级天线 AGV 无线通信解决方案",
  },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/tesight",
    label: "领英",
    icon: "ri:linkedin-fill",
  },
  {
    href: "https://space.bilibili.com/3493083276642735",
    label: "Bilibili",
    icon: "ri:bilibili-fill",
  },
  {
    href: "https://blog.csdn.net/hongke_weixin",
    label: "CSDN",
    icon: "simple-icons:csdn",
  },
  {
    href: "https://www.zhihu.com/people/wei-xing-tong-xin-yu-wu-xian-dian-ji-zhu",
    label: "知乎",
    icon: "ri:zhihu-fill",
  },
  {
    href: "https://appoqnsbkcp8067.pc.xiaoe-tech.com/",
    label: "小鹅通直播",
    icon: "ri:live-fill",
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-background-2 py-16 text-sm text-foreground md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-12 md:gap-10 xl:px-0">
        <div className="md:col-span-5">
          <div>
            <h2 className="mb-2 text-2xl font-bold leading-[1.2]">
              德思特科技
            </h2>
            <p className="max-w-sm text-base leading-7 text-foreground-2 md:leading-8">
              面向低空经济、自动驾驶、前沿科研及无线通信提供高精度、高集成度、可自动化的测试测量方案
            </p>
            <div className="-mx-2 mt-5 flex flex-wrap items-center text-2xl">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="block p-2 text-foreground no-underline hover:opacity-80"
                >
                  <Icon
                    icon={item.icon}
                    className="size-6"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="grid gap-12 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-medium leading-[1.2]">
                解决方案
              </h3>
              <ul className="m-0 list-none space-y-0.5 p-0 leading-7 text-foreground-2">
                {projectLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block no-underline hover:underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium leading-[1.2]">
                联系方式
              </h3>
              <ul className="m-0 list-none space-y-0.5 p-0 leading-7 text-foreground-2">
                <li>
                  <a
                    href="mailto:hktest@tesight.com"
                    className="block no-underline hover:underline"
                  >
                    hktest@tesight.com
                  </a>
                </li>
                <li className="break-words">400-999-3848</li>
                <li className="break-words">
                  <a
                    href="https://www.tesight.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    广州 | 上海 | 苏州 | 北京 | 西安 | 成都 | 中国台湾 |
                    中国香港 | 日本 | 韩国
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
