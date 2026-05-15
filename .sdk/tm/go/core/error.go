package core

type PonyError struct {
	IsPonyError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPonyError(code string, msg string, ctx *Context) *PonyError {
	return &PonyError{
		IsPonyError: true,
		Sdk:              "Pony",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PonyError) Error() string {
	return e.Msg
}
