"use client";

import {
  Typography,
  Grid,
  Paper,
  ButtonGroup,
  Button,
  TextField,
  List,
  ListItem,
  Checkbox,
  Box,
  ListItemButton,
  Skeleton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  addTask,
  setFilter,
  setTasks,
  Task,
  toggleTask,
} from "@/redux/slices/task-slice";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const TaskManagement = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState("");

  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const filter = useAppSelector((state: RootState) => state.tasks.filter);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "incomplete":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleAddTask = useCallback(() => {
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  }, [dispatch, newTask]);

  const handleToggleTask = useCallback(
    (id: number) => {
      dispatch(toggleTask(id));
    },
    [dispatch]
  );

  const handleSetFilter = useCallback(
    (filter: "all" | "completed" | "incomplete") => {
      dispatch(setFilter(filter));
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get<Task[]>(
          "http://localhost:3000/api/tasks"
        );
        dispatch(setTasks(data));
      } catch {
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [dispatch]);

  return (
    <Grid item xs={12} lg={5}>
      <Paper
        sx={{
          marginBottom: "32px",
          border: "1px solid #D3D3D3",
          textAlign: "center",
          padding: "12px",
          color: "#093549",
        }}
        elevation={0}
      >
        <Typography variant="h2" fontWeight="700" fontSize="1.5rem">
          JsonPlaceholder: Todo&apos;s
        </Typography>
      </Paper>

      <FilterButtons currentFilter={filter} onFilterChange={handleSetFilter} />

      <Box display="flex" alignItems="center" gap="10px">
        <TextField
          label="New Task"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          sx={{ minWidth: "fit-content", height: "100%" }}
          variant="contained"
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </Box>

      {loading ? (
        <Skeleton sx={{ marginTop: "18px" }} variant="rounded" height={190} />
      ) : error ? (
        <Typography
          color="error"
          sx={{ marginTop: "18px", textAlign: "center" }}
        >
          {error}
        </Typography>
      ) : filteredTasks.length > 0 ? (
        <TaskList tasks={filteredTasks} onToggleTask={handleToggleTask} />
      ) : null}
    </Grid>
  );
};

const FilterButtons = ({
  currentFilter,
  onFilterChange,
}: {
  currentFilter: "all" | "completed" | "incomplete";
  onFilterChange: (filter: "all" | "completed" | "incomplete") => void;
}) => {
  return (
    <ButtonGroup
      sx={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "18px",
      }}
    >
      {["all", "completed", "incomplete"].map((filter) => (
        <Button
          key={filter}
          variant={currentFilter === filter ? "contained" : "outlined"}
          onClick={() =>
            onFilterChange(filter as "all" | "completed" | "incomplete")
          }
        >
          {filter.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>
  );
};

const TaskList = ({
  tasks,
  onToggleTask,
}: {
  tasks: Task[];
  onToggleTask: (id: number) => void;
}) => (
  <Paper sx={{ marginTop: "18px" }} elevation={3}>
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} disablePadding>
          <ListItemButton
            onClick={() => onToggleTask(task.id)}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </Typography>
            <Checkbox checked={task.completed} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Paper>
);
