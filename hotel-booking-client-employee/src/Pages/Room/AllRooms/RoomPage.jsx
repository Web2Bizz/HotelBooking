import React, { useState, useEffect } from 'react';
import { Radio, Button, Space, Table, Tag, message, Dropdown, Modal, Input } from 'antd';
import { MoreOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import { isEmpty, getColorTag } from '../../../services/functionService';
import './Room.scss';
import RoomCreate from './RoomCreate';
import Loading from '../../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetMessagesAction,
  roomDeleteAction,
  roomGetAction,
} from '../../../store/actions/roomAction';

const Room = () => {
  //
  // Load data
  //
  const { room, isLoading, error, success } = useSelector((state) => state.roomStore);
  const { statusRoom } = useSelector((state) => state.additionalsStore);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(roomGetAction());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [room]);
  const [onCreateRoom, setOnCreateRoom] = useState(true);
  const [onEditRoom, setOnEditRoom] = useState(false);
  const [data, setData] = useState([]);

  const loadData = () => {
    setCount();
    let tempData = [];
    if (room.length !== 0) {
      // eslint-disable-next-line
      room.map((item) => {
        tempData.push({
          key: item.id_room,
          number_room: '#' + item?.room_number,
          floor: item?.room_floor,
          room_type: item?.room_type,
          facility: item?.facility,
          status: item?.status,
        });
      });
      setData(tempData);
    }
  };

  //
  //  Set count rooms
  //
  const [roomsCount, setRoomsCount] = useState(0);
  const [availableRoomsCount, setAvailableRoomsCount] = useState(0);
  const [unavailableDateRoomsCount, setUnavailableDateRoomsCount] = useState(0);
  const setCount = () => {
    setRoomsCount(room.length);
    let available = 0;
    let unavailable = 0;
    // eslint-disable-next-line
    room.map((item) => {
      if (item.status === 'Доступно') {
        available++;
      } else {
        unavailable++;
      }
    });
    setAvailableRoomsCount(available);
    setUnavailableDateRoomsCount(unavailable);
  };

  //
  // Notification
  //
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!isEmpty(success)) {
      successCreateRoom(success);
      dispatch(roomGetAction());
      dispatch(resetMessagesAction());
    } else if (!isEmpty(error)) {
      errorCreateRoom(error);
      dispatch(resetMessagesAction());
    }
    // eslint-disable-next-line
  }, [success, error]);
  const successCreateRoom = (success) => {
    messageApi.open({
      type: 'success',
      content: success,
    });
  };
  const errorCreateRoom = (error) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };

  //
  // Schema table
  //
  const [selectedRow, setSelectedRow] = useState();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  //serach
  const [searchText, setSearchText] = useState('');
  const loadFilter = () => {
    let tempFilter = [];
    // eslint-disable-next-line
    statusRoom.map((item) => {
      tempFilter.push({ text: item.status, value: item.status });
    });
    return tempFilter;
  };

  const [items, setItems] = useState([]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData.role === 'admin') {
      setItems([
        {
          label: 'Редактировать',
          key: 'edit',
        },
        {
          label: 'Удалить',
          key: 'delete',
        },
      ]);
    }
  }, []);
  const columns = [
    {
      title: '№ Комнаты',
      dataIndex: 'number_room',
      key: 'number_room',
      render: (text) => <h3>{text}</h3>,
    },
    {
      title: 'Тип комнаты',
      dataIndex: 'room_type',
      key: 'room_type',
    },
    {
      title: 'Этаж',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Удобства',
      key: 'facility',
      dataIndex: 'facility',
      width: 450,
      render: (_, { facility }) => (
        <>
          {facility?.map((tag) => {
            return (
              <Tag color={'green'} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.floor).toLowerCase().includes(value.toLowerCase()) ||
        String(record.room_type).toLowerCase().includes(value.toLowerCase()) ||
        String(record.number_room).toLowerCase().includes(value.toLowerCase()) ||
        String(record.status).toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      filters: loadFilter(),
      render: (_, { status }) => (
        <Tag color={getColorTag(status, 'status', statusRoom)}>{status}</Tag>
      ),
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      filterIcon: <svg width={1} height={1}></svg>,
    },
    items.length > 0
      ? {
          title: '',
          key: 'action',
          render: (_, record) => (
            <Space size="large">
              <Dropdown menu={{ items, onClick, record }} trigger={['click']}>
                <Space>
                  <Button
                    onClick={() => setSelectedRow(record.key)}
                    shape="circle"
                    icon={<MoreOutlined />}
                  />
                </Space>
              </Dropdown>
            </Space>
          ),
        }
      : {},
  ];

  //
  // Filters
  //
  const clearFilters = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAvailabilitySort = () => {
    setFilteredInfo({
      status: ['Доступно'],
    });
  };
  const setUnavailabilitySort = () => {
    let unavailableDate = [];
    // eslint-disable-next-line
    statusRoom.map((item) => {
      if (item.status !== 'Доступно') {
        unavailableDate.push(item.status);
      }
    });
    setFilteredInfo({
      status: unavailableDate,
    });
  };
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  //
  // View table
  //
  const contentView = onCreateRoom ? (
    <Table
      pagination={{
        pageSize: 6,
      }}
      style={{ marginTop: '10px' }}
      columns={columns}
      dataSource={isEmpty(data) ? [] : data}
      onChange={handleChange}
    />
  ) : (
    <RoomCreate
      setOnCreateRoom={setOnCreateRoom}
      editRow={selectedRow}
      setOnEditRoom={setOnEditRoom}
      onEditRoom={onEditRoom}
    />
  );

  // Dropdown menu
  const onClick = ({ key }) => {
    if (key === 'delete') {
      showDeleteConfirm();
    }
    if (key === 'edit') {
      setOnCreateRoom(false);
      setOnEditRoom(true);
    }
  };

  //
  // Delete row
  //
  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: 'Вы уверены, что хотите удалить комнату?',
      icon: <ExclamationCircleFilled />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        dispatch(roomDeleteAction(selectedRow));
      },
    });
  };

  return (
    <>
      {contextHolder}
      {onCreateRoom ? (
        <>
          <h2>Комнаты</h2>
          <div className="d-f jc-sb mt-10">
            <Radio.Group defaultValue="a" size="large">
              <Radio.Button value="a" onClick={() => clearFilters()}>
                Все комнаты {'(' + roomsCount + ')'}
              </Radio.Button>
              <Radio.Button value="b" onClick={() => setAvailabilitySort()}>
                Свободные комнаты {'(' + availableRoomsCount + ')'}
              </Radio.Button>
              <Radio.Button value="c" onClick={() => setUnavailabilitySort()}>
                Занятые комнаты {'(' + unavailableDateRoomsCount + ')'}
              </Radio.Button>
            </Radio.Group>
            <div>
              <Input
                size={'large'}
                style={{ width: '16vw' }}
                placeholder="Поиск..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {items.length > 0 ? (
                <Button
                  size="large"
                  type="primary"
                  style={{ marginLeft: '2vh' }}
                  onClick={() => setOnCreateRoom(false)}>
                  Добавить комнату
                </Button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
      {contentView}
      {isLoading && <Loading />}
    </>
  );
};

export default Room;
