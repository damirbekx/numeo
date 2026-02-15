import {
  Col,
  Collapse,
  List,
  Row,
  Space,
  Tabs,
  Tag,
  Typography
} from 'antd';
import axios, { AxiosError } from 'axios';
import {
  Activity,
  BookOpen,
  Check,
  CheckCircle2,
  Code,
  Copy,
  Cpu,
  Database,
  Download,
  Edit3,
  ExternalLink,
  Filter,
  Github,
  HelpCircle,
  LayoutDashboard,
  Play,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  Terminal,
  Users,
  XCircle
} from 'lucide-react';
import React, { useState } from 'react';

const { Title, Paragraph, Text } = Typography;

const API_BASE_URL = 'http://127.0.0.1:8000';

interface ResponseState {
  data: unknown;
  status: number;
  loading: boolean;
  error?: string;
}

const Help: React.FC = () => {
  const [apiResponses, setApiResponses] = useState<Record<string, ResponseState>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadJson = (data: unknown, fileName: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const tryEndpoint = async (path: string) => {
    setApiResponses(prev => ({ ...prev, [path]: { data: null, status: 0, loading: true } }));
    try {
      const response = await axios.get(`${API_BASE_URL}${path}`);
      setApiResponses(prev => ({
        ...prev,
        [path]: { data: response.data, status: response.status, loading: false }
      }));
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setApiResponses(prev => ({
        ...prev,
        [path]: {
          data: axiosError.response?.data || null,
          status: axiosError.response?.status || 500,
          loading: false,
          error: axiosError.message
        }
      }));
    }
  };

  const clearResponse = (path: string) => {
    setApiResponses(prev => {
      const next = { ...prev };
      delete next[path];
      return next;
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="py-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <HelpCircle className="text-blue-600" size={24} />
          Documentation & Help
        </h1>
        <p className="text-slate-500 mt-1 font-medium">A minimal guide for project architecture and system setup.</p>
      </header>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <Tabs
          defaultActiveKey="1"
          className="help-tabs minimal-tabs"
          items={[
            {
              key: '1',
              label: (
                <span className="flex items-center gap-2 px-4 py-2 font-bold">
                  <BookOpen size={18} /> User Manual
                </span>
              ),
              children: (
                <div className="space-y-10 p-8">
                  <section>
                    <Title level={4} className="mb-6! font-bold!">System Navigation</Title>
                    <Row gutter={[16, 16]}>
                      {[
                        {
                          icon: <LayoutDashboard size={20} />,
                          title: "Dashboard",
                          desc: "Aggregated system metrics and real-time user analytics."
                        },
                        {
                          icon: <Users size={20} />,
                          title: "Users Module",
                          desc: "High-performance user database with virtualization."
                        },
                        {
                          icon: <ShieldCheck size={20} />,
                          title: "Help Center",
                          desc: "Technical documentation and setup instructions."
                        },
                      ].map((item, idx) => (
                        <Col xs={24} md={8} key={idx}>
                          <div className="p-6 border border-slate-100 rounded-xl hover:border-slate-300 transition-colors h-full">
                            <div className="text-blue-600 mb-3">{item.icon}</div>
                            <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </section>

                  <section>
                    <Title level={4} className="mb-6! font-bold!">Core Capabilities</Title>
                    <List
                      grid={{ gutter: 16, column: 2, xs: 1, sm: 1, md: 2 }}
                      dataSource={[
                        { icon: <Search size={18} />, title: "Search", desc: "Debounced user lookup." },
                        { icon: <Filter size={18} />, title: "Filter", desc: "Country and status sorting." },
                        { icon: <Database size={18} />, title: "Virtualization", desc: "Handles 10k+ rows via React Virtuoso." },
                        { icon: <Edit3 size={18} />, title: "Live Edit", desc: "Optimistic state updates." }
                      ]}
                      renderItem={(item) => (
                        <List.Item>
                          <div className="flex gap-4 p-4 border border-slate-100 rounded-xl">
                            <div className="text-slate-400 mt-1">{item.icon}</div>
                            <div>
                              <Text strong className="block text-slate-800">{item.title}</Text>
                              <Text type="secondary" className="text-xs">{item.desc}</Text>
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                  </section>
                </div>
              ),
            },
            {
              key: '2',
              label: (
                <span className="flex items-center gap-2 px-4 py-2 font-bold">
                  <Code size={18} /> Project Structure
                </span>
              ),
              children: (
                <div className="p-8">
                  <div className="space-y-10">
                    <section>
                      <Title level={4} className="mb-6! font-bold!">Full Frontend Architecture</Title>
                      <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-700">
                        <div className="space-y-1">
                          <div>dashboard/</div>
                          <div className="pl-4">├── src/</div>
                          <div className="pl-8">├── api/ <Text type="secondary" className="text-xs ml-2"># Axios config & endpoints</Text></div>
                          <div className="pl-8">├── app/ <Text type="secondary" className="text-xs ml-2"># Root App & main entry</Text></div>
                          <div className="pl-8">├── assets/ <Text type="secondary" className="text-xs ml-2"># Static assets (images, logos)</Text></div>
                          <div className="pl-8">├── components/</div>
                          <div className="pl-12">├── Layout/ <Text type="secondary" className="text-xs ml-2"># App shell & Sidebar</Text></div>
                          <div className="pl-12">└── common/ <Text type="secondary" className="text-xs ml-2"># Global UI components</Text></div>
                          <div className="pl-8">├── constants/ <Text type="secondary" className="text-xs ml-2"># Navigation & static data</Text></div>
                          <div className="pl-8">├── hooks/ <Text type="secondary" className="text-xs ml-2"># useGet, useAnalytics</Text></div>
                          <div className="pl-8">├── pages/</div>
                          <div className="pl-12">├── dashboard/ <Text type="secondary" className="text-xs ml-2"># Analytics views</Text></div>
                          <div className="pl-12">├── help/ <Text type="secondary" className="text-xs ml-2"># Current help page</Text></div>
                          <div className="pl-12">└── users/ <Text type="secondary" className="text-xs ml-2"># User management module</Text></div>
                          <div className="pl-8">├── providers/ <Text type="secondary" className="text-xs ml-2"># AppProvider, QueryClient</Text></div>
                          <div className="pl-8">├── routes/ <Text type="secondary" className="text-xs ml-2"># Route definitions</Text></div>
                          <div className="pl-8">├── shared/ <Text type="secondary" className="text-xs ml-2"># Styles & utils</Text></div>
                          <div className="pl-8">└── types/ <Text type="secondary" className="text-xs ml-2"># TS interfaces</Text></div>
                          <div className="pl-4">├── public/</div>
                          <div className="pl-4">├── package.json</div>
                          <div className="pl-4">├── tsconfig.json</div>
                          <div className="pl-4">└── vite.config.ts</div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <Title level={4} className="mb-6! font-bold!">Frontend Client Setup</Title>
                      <Paragraph className="text-slate-500">
                        Follow these steps to run the React/Vite dashboard client locally.
                      </Paragraph>

                      <div className="space-y-4">
                        <div className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                          <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                            <Terminal size={16} />
                            <span>Step 1: Install Dependencies</span>
                          </div>
                          <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-blue-300 relative group/cmd">
                            <div className="text-white font-bold">npm install</div>
                            <button
                              onClick={() => copyToClipboard("npm install", "client1")}
                              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg opacity-0 group-hover/cmd:opacity-100 transition-opacity"
                            >
                              {copiedId === "client1" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>

                        <div className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                          <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                            <Terminal size={16} />
                            <span>Step 2: Start Development Server</span>
                          </div>
                          <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-blue-300 relative group/cmd">
                            <div className="text-white font-bold">npm run dev</div>
                            <button
                              onClick={() => copyToClipboard("npm run dev", "client2")}
                              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg opacity-0 group-hover/cmd:opacity-100 transition-opacity"
                            >
                              {copiedId === "client2" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>

                        <div className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                          <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                            <Terminal size={16} />
                            <span>Step 3: Production Build (Optional)</span>
                          </div>
                          <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-blue-300 relative group/cmd">
                            <div className="text-white font-bold">npm run build</div>
                            <button
                              onClick={() => copyToClipboard("npm run build", "client3")}
                              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg opacity-0 group-hover/cmd:opacity-100 transition-opacity"
                            >
                              {copiedId === "client3" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              ),
            },
            {
              key: '3',
              label: (
                <span className="flex items-center gap-2 px-4 py-2 font-bold">
                  <Activity size={18} /> API Reference
                </span>
              ),
              children: (
                <div className="space-y-8 p-8">
                  <section>
                    <Title level={4} className="mb-6! font-bold!">Backend Endpoints</Title>
                    <div className="space-y-6">
                      {[
                        { method: "GET", path: "/api/users/", desc: "Fetch paginated users with filters and sorting.", tag: "blue" },
                        { method: "GET", path: "/api/analytics/", desc: "Get aggregated dashboard statistics.", tag: "blue" },
                        { method: "GET", path: "/api/countries/", desc: "Retrieve list of countries for filters.", tag: "blue" }
                      ].map((item, idx) => {
                        const response = apiResponses[item.path];
                        return (
                          <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-slate-300 transition-colors">
                            <div className="flex items-center gap-4 p-4 bg-slate-50/50 border-b border-slate-100">
                              <Tag color={item.tag} className="px-3 py-0.5 rounded-md font-black m-0 tracking-tighter">{item.method}</Tag>
                              <Text strong className="font-mono text-sm">{item.path}</Text>
                              <Text type="secondary" className="text-xs ml-auto font-medium">{item.desc}</Text>
                              <div className="flex gap-2 ml-4">
                                {response ? (
                                  <button
                                    onClick={() => clearResponse(item.path)}
                                    className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
                                    title="Clear"
                                  >
                                    <RotateCcw size={14} />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => tryEndpoint(item.path)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 active:scale-95"
                                  >
                                    <Play size={12} fill="currentColor" />
                                    Try it out
                                  </button>
                                )}
                              </div>
                            </div>

                            {response && (
                              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="px-4 py-2 bg-slate-900 flex items-center justify-between">
                                  <div className="flex gap-2 items-center">
                                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Server Response</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400">STATUS:</span>
                                    <Tag
                                      color={response.status >= 200 && response.status < 300 ? 'success' : 'error'}
                                      className="m-0 px-2 py-0 border-none font-mono text-[10px]"
                                    >
                                      {response.status}
                                    </Tag>
                                  </div>
                                </div>
                                <div className="p-4 bg-slate-950 font-mono text-xs overflow-x-auto">
                                  {response.loading ? (
                                    <div className="flex items-center gap-2 text-blue-400 italic">
                                      <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                      Sending request to {API_BASE_URL}...
                                    </div>
                                  ) : response.error ? (
                                    <div className="text-rose-400 flex items-start gap-2">
                                      <XCircle size={14} className="mt-0.5 shrink-0" />
                                      <div>
                                        <div className="font-bold underline mb-1 uppercase tracking-tighter">Connection Error</div>
                                        <pre className="whitespace-pre-wrap">{response.error}</pre>
                                        <div className="mt-2 text-slate-500 text-[10px]">Ensure your Django backend is running at {API_BASE_URL}</div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-emerald-400">
                                      <div className="flex items-center gap-2 mb-2 text-slate-500 border-b border-slate-800/50 pb-2">
                                        <CheckCircle2 size={12} />
                                        <span>Response Body</span>
                                        <div className="ml-auto flex gap-2">
                                          <button
                                            onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2), item.path)}
                                            className="p-1 hover:bg-slate-800 rounded transition-colors"
                                            title="Copy JSON"
                                          >
                                            {copiedId === item.path ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                          </button>
                                          <button
                                            onClick={() => downloadJson(response.data, item.path.replace(/\//g, '_').replace(/^_|_$/g, ''))}
                                            className="p-1 hover:bg-slate-800 rounded transition-colors"
                                            title="Download JSON"
                                          >
                                            <Download size={12} />
                                          </button>
                                        </div>
                                      </div>
                                      <pre className="whitespace-pre-wrap">{JSON.stringify(response.data, null, 2)}</pre>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  <div className="p-5 bg-amber-50 border border-amber-100 rounded-xl flex gap-4">
                    <ShieldCheck className="text-amber-500 shrink-0" size={20} />
                    <div>
                      <Text strong className="text-amber-900 text-sm">Security & Failures</Text>
                      <Paragraph className="mb-0 text-amber-800 text-xs mt-1">
                        The API includes a random 25% failure rate for testing frontend robustness.
                        The UI handles these via optimistic rollbacks.
                      </Paragraph>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: '4',
              label: (
                <span className="flex items-center gap-2 px-4 py-2 font-bold">
                  <Cpu size={18} /> Backend Setup
                </span>
              ),
              children: (
                <div className="space-y-8 p-8">
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <Title level={4} className="mb-0! font-bold!">Django REST Backend</Title>
                      <a
                        href="https://github.com/damirbek/high-volume-backend"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-slate-600 hover:text-black font-medium text-sm"
                      >
                        <Github size={18} />
                        View on GitHub
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <Paragraph className="text-slate-500">
                      Follow these steps to initialize and run the Python backend server.
                    </Paragraph>

                    <div className="space-y-4">
                      <div className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                        <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                          <Terminal size={16} />
                          <span>Step 1: Environment Setup</span>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-blue-300 relative group/cmd">
                          <div># Create virtual environment</div>
                          <div>python -m venv venv</div>
                          <div className="mt-3"># Activate environment (Mac/Linux)</div>
                          <div className="text-white font-bold">source venv/bin/activate</div>
                          <button
                            onClick={() => copyToClipboard("python -m venv venv && source venv/bin/activate", "cmd1")}
                            className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg opacity-0 group-hover/cmd:opacity-100 transition-opacity"
                          >
                            {copiedId === "cmd1" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>

                      <div className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                        <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                          <Terminal size={16} />
                          <span>Step 2: Dependencies</span>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-blue-300 relative group/cmd">
                          <div># Install required packages</div>
                          <div className="text-white font-bold">pip install -r requirements.txt</div>
                          <button
                            onClick={() => copyToClipboard("pip install -r requirements.txt", "cmd2")}
                            className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg opacity-0 group-hover/cmd:opacity-100 transition-opacity"
                          >
                            {copiedId === "cmd2" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>

                      <div className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                        <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                          <Terminal size={16} />
                          <span>Step 3: Run Server</span>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-blue-300 relative group/cmd">
                          <div># Run migrations & start server</div>
                          <div>python manage.py migrate</div>
                          <div className="text-white font-bold">python manage.py runserver</div>
                          <button
                            onClick={() => copyToClipboard("python manage.py migrate && python manage.py runserver", "cmd3")}
                            className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg opacity-0 group-hover/cmd:opacity-100 transition-opacity"
                          >
                            {copiedId === "cmd3" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
                    <div className="flex gap-4">
                      <ShieldCheck className="text-blue-500 shrink-0" size={24} />
                      <div>
                        <Text strong className="text-blue-900">API Availability</Text>
                        <Paragraph className="mb-0 text-blue-800 text-sm mt-1">
                          After starting the server, the frontend will automatically connect to
                          <Text code className="bg-white">http://127.0.0.1:8000</Text>.
                          Ensure the server is running before interacting with user data.
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Support & FAQ</h2>
        <Collapse
          ghost
          expandIconPosition="end"
          className="bg-white border border-slate-200 rounded-xl"
          items={[
            {
              key: '1',
              label: <span className="font-bold text-slate-700">Project Theme</span>,
              children: <p className="text-slate-500 text-sm">Custom token-based UI managed via AntD ConfigProvider and Tailwind utility classes.</p>,
              className: "border-b border-slate-100"
            },
            {
              key: '2',
              label: <span className="font-bold text-slate-700">Contact Support</span>,
              children: (
                <div className="flex items-center gap-4 py-2">
                  <a href="https://t.me/frntndev" className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
                    <Send size={16} /> Telegram @frntndev
                  </a>
                </div>
              )
            }
          ]}
        />
      </section>

      <footer className="text-center pt-10 border-t border-slate-100">
        <Space direction="vertical" align="center">
          <Text type="secondary" className="text-xs font-medium uppercase tracking-widest">
            High-Volume Dashboard Architecture &copy; {new Date().getFullYear()}
          </Text>
        </Space>
      </footer>
    </div>
  );
};

export default Help;
