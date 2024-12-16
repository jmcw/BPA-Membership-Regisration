export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  minPlayers: number;
  maxPlayers: number;
  duration: string;
}

export interface JsonApiEventData {
  id: string;
  type: string;
  attributes: {
    title: string;
    field_description?: {
      value: string;
      processed: string;
    };
    field_category?: {
      target_id: string;
    };
    field_min_players?: {
      value: number;
    };
    field_max_players?: {
      value: number;
    };
    field_duration?: {
      value: string;
    };
  };
}

export interface JsonApiEventResponse {
  data: JsonApiEventData[];
  included?: any[];
  meta?: any;
  links?: any;
}