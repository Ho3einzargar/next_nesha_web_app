export const roadMapApi = {
  Auth: {
    register: 'accounts/register/',
    login: 'accounts/login/',
    refresh: 'api/refresh/',
  },
  search: 'search',
  softwares: {
    software_detail: 'softwares',
    favorite_softwares: 'softwares/?likes=dessc&page=1',
    recent_fields: 'fields/',
    fields_search: 'field_search/',
    labs_search: 'lab_search/',
    comment: 'children/?page=1'
  },
  labs: {
    detail_lab: 'labs'
  },
  search_pro: {
    licenses: 'licenses',
    lab_search: 'lab_search/?field_id=2',
    platforms: 'platforms',
    result: 'software_search'
  }

};
