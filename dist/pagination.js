(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react);
        global.pagination = mod.exports;
    }
})(this, function (exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = _react2.default.createClass({
        displayName: 'pagination',

        getDefaultProps: function getDefaultProps() {
            return {
                containerClass: '',
                limit: 10,
                pagination: null
            };
        },

        getInitialState: function getInitialState() {
            return {
                displayedPages: []
            };
        },

        componentWillMount: function componentWillMount() {
            this.setDisplayedPages(this.props);
        },

        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.setDisplayedPages(nextProps);
        },

        getIntArray: function getIntArray(min, max) {
            var result = [];
            for (; min < max; ++min) {
                result.push(min);
            }
            return result;
        },

        setDisplayedPages: function setDisplayedPages(props) {
            if (!props.pagination.ready()) {
                return;
            }

            var pageCount = props.pagination.totalPages(),
                current = props.pagination.currentPage(),
                min = 0;

            if (pageCount > props.limit) {
                if (current > props.limit / 2) {
                    if (current > pageCount - props.limit / 2) {
                        min = pageCount - props.limit;
                    } else {
                        min = Math.floor(current - props.limit / 2);
                    }
                }
                this.state.displayedPages = this.getIntArray(min + 1, min + 1 + props.limit);
            } else {
                this.state.displayedPages = this.getIntArray(1, pageCount + 1);
            }

            this.setState({
                displayedPages: this.state.displayedPages
            });
        },

        handleClickPage: function handleClickPage(page, event) {
            if (page > 0 && page <= this.props.pagination.totalPages()) {
                this.props.pagination.currentPage(page);
            }

            event.preventDefault();
        },

        handleClickShowPrevious: function handleClickShowPrevious(event) {
            var min = Math.max(1, this.state.displayedPages[0] - this.props.limit);

            this.state.displayedPages = this.getIntArray(min, min + this.props.limit);

            this.setState({
                displayedPages: this.state.displayedPages
            });

            event.preventDefault();
        },

        handleClickShowNext: function handleClickShowNext(event) {
            var pageCount = this.props.pagination.totalPages(),
                min = Math.min(pageCount - this.props.limit, this.state.displayedPages[this.state.displayedPages.length - 1]) + 1;

            this.state.displayedPages = this.getIntArray(min, min + this.props.limit);

            this.setState({
                displayedPages: this.state.displayedPages
            });

            event.preventDefault();
        },

        renderPage: function renderPage(page) {
            var liClass = '';

            if (this.props.pagination.currentPage() == page) {
                liClass = 'active';
            }

            return _react2.default.createElement(
                'li',
                { key: 'page' + page, className: liClass },
                _react2.default.createElement(
                    'a',
                    { href: '#', className: 'page-link', title: 'Go to page ' + page, onClick: this.handleClickPage.bind(this, page) },
                    ' ',
                    page,
                    ' '
                )
            );
        },

        renderFirstPage: function renderFirstPage() {
            if (this.state.displayedPages.length && this.state.displayedPages[0] > 1) {
                return this.renderPage(1);
            }

            return null;
        },

        renderPreviousPages: function renderPreviousPages() {
            if (this.state.displayedPages.length && this.state.displayedPages[0] > 2) {
                return _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: '#', className: 'show-prev', title: 'Show previous pages', onClick: this.handleClickShowPrevious },
                        ' ... '
                    )
                );
            }

            return null;
        },

        renderNextPages: function renderNextPages() {
            if (this.state.displayedPages.length && this.state.displayedPages[this.state.displayedPages.length - 1] < this.props.pagination.totalPages() - 1) {
                return _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: '#', className: 'show-prev', title: 'Show next pages', onClick: this.handleClickShowNext },
                        ' ... '
                    )
                );
            }

            return null;
        },

        renderLastPage: function renderLastPage() {
            if (this.state.displayedPages.length && this.state.displayedPages[this.state.displayedPages.length - 1] < this.props.pagination.totalPages()) {
                return this.renderPage(this.props.pagination.totalPages());
            }

            return null;
        },

        render: function render() {
            var containerClass = 'pagination-container';
            if (this.props.containerClass.length) {
                containerClass += ' ' + this.props.containerClass;
            }

            if (this.props.pagination && this.props.pagination.ready() && this.props.pagination.totalPages() > 1 && this.props.limit) {
                return _react2.default.createElement(
                    'div',
                    { className: containerClass },
                    _react2.default.createElement(
                        'ul',
                        { className: 'pagination' },
                        _react2.default.createElement(
                            'li',
                            { className: this.props.pagination.currentPage() == 1 ? 'disabled' : '' },
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'previous-page', title: 'Previous page', onClick: this.handleClickPage.bind(this, this.props.pagination.currentPage() - 1) },
                                ' < '
                            )
                        ),
                        this.renderFirstPage(),
                        this.renderPreviousPages(),
                        this.state.displayedPages.map(this.renderPage),
                        this.renderNextPages(),
                        this.renderLastPage(),
                        _react2.default.createElement(
                            'li',
                            { className: this.props.pagination.currentPage() == this.props.pagination.totalPages() ? 'disabled' : '' },
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'next-page', title: 'Next page', onClick: this.handleClickPage.bind(this, this.props.pagination.currentPage() + 1) },
                                ' > '
                            )
                        )
                    )
                );
            }

            return _react2.default.createElement('div', { className: containerClass });
        }
    });
});