export const roadMapApi = {
  Auth: {
    register: 'accounts/register/',
    login: 'accounts/login/',
    refresh: 'api/refresh/',
  },
  pending: 'api/pending/',
  submit: {
    windows_user: {
      access: 'api/presubmit_win_user_analysis/',
      uploadFile: 'api/submit_pre_many_file/',
      fileTreeOption: 'api/presubmit_filetree',
      submitFile: 'api/submit_many_file/',
    },
    url: {
      access: 'api/presubmit_url_analysis/',
      uploadFile: 'api/submit_pre_many_url/',
      fileTreeOption: 'api/presubmit_filetree',
      submitFile: 'api/submit_many_file/',
    },
    windows_kernel: {
      access: 'api/presubmit_win_kernel_analysis/',
      uploadFile: 'api/submit_rp/',
    },
    linux: {
      access: 'api/presubmit_linux_kernel_analysis/',
    },
    android: {
      access: 'api/presubmit_droid/',
      submitFile: 'api/submit_droid/',
    },
    checkStatus: 'api/check_status/',
  },
  recentList: 'api/recentlist/',
  summary: {
    info: 'api/info',
    target: 'api/target',
    signatures: 'api/signatures',
    shots: 'api/original_shots',
    network: 'api/network',
    download: 'api/download_file',
  },
  static: {
    vmType: 'api/getvmtype',
    staticData: 'api/static_result',
    stringData: 'api/strings_result',
    AntivirusData: 'api/antivirus_result',
    apkData: 'api/apkinfo',
  },
  behavior: {
    main: 'api/behavior',
    chunk: 'api/behavior_chunk',
    filter: 'api/filter_behavior',
    search: 'api/behavioral_search',
  },
  network: {
    network: 'api/network',
    networkTCP: 'api/network_tcp',
  },
  search:'search'
};
